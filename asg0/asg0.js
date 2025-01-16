// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('cnv1');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Draw a blue rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, canvas.width, canvas.height);        // Fill a rectangle with the color


  const drawButton = document.getElementById('drawButton');
  drawButton.addEventListener('click', handleDrawEvent);

  const drawButton2 = document.getElementById('drawButton2');
  drawButton2.addEventListener('click', handleDrawOperationEvent);
}

function drawVector(v, color) {
  const canvas = document.getElementById('cnv1');
  const ctx = canvas.getContext('2d');
  const scale = 20;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const xEnd = centerX + v.elements[0] * scale;
  const yEnd = centerY - v.elements[1] * scale; 

  ctx.strokeStyle = color;

  // Draw the vector
  ctx.beginPath();
  ctx.moveTo(centerX, centerY); 
  ctx.lineTo(xEnd, yEnd); 
  ctx.stroke();
}

function handleDrawEvent() {
  const canvas = document.getElementById('cnv1');
  const ctx = canvas.getContext('2d');

  // Clear the canvas
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Read input values for v1 from text boxes
  const v1x = parseFloat(document.getElementById('v1x').value) || 0;
  const v1y = parseFloat(document.getElementById('v1y').value) || 0;
  const v2x = parseFloat(document.getElementById('v2x').value) || 0;
  const v2y = parseFloat(document.getElementById('v2y').value) || 0;

  // Create a new Vector3 instance for v1
  const v1 = new Vector3([v1x, v1y, 0]);
  const v2 = new Vector3([v2x,v2y,0]);
  

  // Draw the vector
  drawVector(v1, "red");
  drawVector(v2,"blue");
}

function areaTriangle(v1, v2) {
  const crossProduct = Vector3.cross(v1, v2);
  const areaParallelogram = crossProduct.magnitude();
  const areaTriangle = 0.5 * areaParallelogram;
  return areaTriangle;
}


function handleDrawOperationEvent() {
  const canvas = document.getElementById('cnv1');
  const ctx = canvas.getContext('2d');

  // Clear the canvas
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Read input values for v1 and v2
  const v1x = parseFloat(document.getElementById('v1x').value) || 0;
  const v1y = parseFloat(document.getElementById('v1y').value) || 0;
  const v2x = parseFloat(document.getElementById('v2x').value) || 0;
  const v2y = parseFloat(document.getElementById('v2y').value) || 0;

  // Read the selected operation
  const operation = document.getElementById('operation').value;
  const scalar = parseFloat(document.getElementById('scalar').value) || 1;

  // Create new Vector3 instances for v1 and v2
  const v1 = new Vector3([v1x, v1y, 0]);
  const v2 = new Vector3([v2x, v2y, 0]);

  // Draw the input vectors
  drawVector(v1, "red");
  drawVector(v2, "blue");

  let resultV3, resultV4;

  if (operation === "add") {
    resultV3 = v1.add(v2);
    drawVector(resultV3, "green");
  } else if (operation === "sub") {
    resultV3 = v1.sub(v2);
    drawVector(resultV3, "green");
  } else if (operation === "mul") {
    resultV3 = v1.mul(scalar);
    resultV4 = v2.mul(scalar);
    drawVector(resultV3, "green");
    drawVector(resultV4, "green");
  } else if (operation === "div") {
    resultV3 = v1.div(scalar);
    resultV4 = v2.div(scalar);
    drawVector(resultV3, "green");
    drawVector(resultV4, "green");
  } else if (operation === "magnitude") {
    const magnitudeV1 = v1.magnitude();
    const magnitudeV2 = v2.magnitude();
    console.log("Magnitude of v1:", magnitudeV1);
    console.log("Magnitude of v2:", magnitudeV2);
  } else if (operation === "normalize") {
    const normalizedV1 = v1.normalize();
    const normalizedV2 = v2.normalize();
    drawVector(normalizedV1, "green");
    drawVector(normalizedV2, "green");
  } else if (operation === "Angle Between") {
    const d = Vector3.dot(v1, v2); 
    const magnitudeV1 = v1.magnitude();
    const magnitudeV2 = v2.magnitude();

    const cosAlpha = d / (magnitudeV1 * magnitudeV2);
    const angleRad = Math.acos(cosAlpha);  
    const angleDeg = angleRad * (180 / Math.PI);  

    console.log("Angle between v1 and v2:", angleDeg, "degrees");
  }
  else if (operation === "Area"){
    const area = areaTriangle(v1, v2); // Use areaTriangle function
    console.log("Area of the triangle:", area);
  }
}