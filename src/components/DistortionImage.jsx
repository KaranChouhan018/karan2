'use client';
import React, { useEffect, useRef } from 'react';

const DistortionImage = ({ src, alt, className }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const scrollRef = useRef({ current: 0, previous: 0, velocity: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Resize canvas to match container
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create shader program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    // Setup attributes and uniforms
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const texcoordLocation = gl.getAttribLocation(program, 'a_texCoord');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const distortionLocation = gl.getUniformLocation(program, 'u_distortion');
    const imageLocation = gl.getUniformLocation(program, 'u_image');

    // Setup buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setRectangle(gl, 0, 0, canvas.width, canvas.height);

    const texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0.0, 0.0,
      1.0, 0.0,
      0.0, 1.0,
      0.0, 1.0,
      1.0, 0.0,
      1.0, 1.0,
    ]), gl.STATIC_DRAW);

    // Create and load the texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Load the image
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      imageRef.current = image;
    };

    // Track scroll
    const handleScroll = () => {
      scrollRef.current.previous = scrollRef.current.current;
      scrollRef.current.current = window.scrollY;
      
      // Calculate velocity with damping for smoother transitions
      const rawVelocity = (scrollRef.current.current - scrollRef.current.previous);
      scrollRef.current.velocity += (rawVelocity * 0.1 - scrollRef.current.velocity) * 0.3;
      
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(render);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Render function
    const render = () => {
      if (!imageRef.current) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      resizeCanvas();
      
      // Clear canvas
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      // Enable blending for transparent edges
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      
      gl.useProgram(program);
      
      // Clamp distortion to reasonable values
      const distortion = Math.max(-0.8, Math.min(0.8, scrollRef.current.velocity * 0.05));
      gl.uniform1f(distortionLocation, distortion);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      
      // Set up the position attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      
      // Set up the texcoord attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
      gl.enableVertexAttribArray(texcoordLocation);
      gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);
      
      // Set the texture uniform
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(imageLocation, 0);
      
      // Draw the rectangle
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      // Dampen the velocity
      scrollRef.current.velocity *= 0.95;
      
      if (Math.abs(scrollRef.current.velocity) > 0.01) {
        rafRef.current = requestAnimationFrame(render);
      } else {
        // Reset to flat when not scrolling
        scrollRef.current.velocity = 0;
        requestAnimationFrame(() => {
          gl.uniform1f(distortionLocation, 0);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
          rafRef.current = null;
        });
      }
    };

    // Initial render
    render();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [src]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
      />
    </div>
  );
};

// Helper functions
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) return shader;
  
  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) return program;
  
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function setRectangle(gl, x, y, width, height) {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2,
  ]), gl.STATIC_DRAW);
}

// Vertex shader - handles the position of each pixel
const vertexShaderSource = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  void main() {
    // Convert from pixels to 0.0 to 1.0
    vec2 zeroToOne = a_position / u_resolution;
    
    // Convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
    
    // Convert from 0->2 to -1->+1 (clipspace)
    vec2 clipSpace = zeroToTwo - 1.0;
    
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    
    // Pass the texCoord to the fragment shader
    v_texCoord = a_texCoord;
  }
`;

// Fragment shader - creates the concave bending effect
const fragmentShaderSource = `
  precision mediump float;
  
  uniform sampler2D u_image;
  uniform float u_distortion;
  
  varying vec2 v_texCoord;
  
  void main() {
    // Center the UV coordinates (0-1) to (-0.5 to 0.5)
    vec2 uv = v_texCoord - 0.5;
    
    // Calculate distance from center for radial effect
    float dist = length(uv);
    
    // Create a concave distortion effect
    float strength = 0.8 * u_distortion;
    
    // Apply 3D-like bend effect (more pronounced in center)
    float z = 1.0 + strength * (1.0 - dist * 2.0);
    
    // Apply distortion with perspective
    vec2 distortedUv = uv / z;
    
    // Add horizontal bend based on vertical position
    distortedUv.x += u_distortion * 0.1 * (uv.y * uv.y) * sign(uv.x);
    
    // Sharper folding effect along the middle
    float fold = u_distortion * 0.15 * sin(uv.x * 3.14159);
    distortedUv.y += fold * (1.0 - abs(uv.y * 2.0));
    
    // Restore UV coordinates to 0-1 range
    distortedUv += 0.5;
    
    // Check if UV coordinates are within bounds
    if (distortedUv.x < 0.0 || distortedUv.x > 1.0 || distortedUv.y < 0.0 || distortedUv.y > 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    } else {
      gl_FragColor = texture2D(u_image, distortedUv);
    }
  }
`;

export default DistortionImage;