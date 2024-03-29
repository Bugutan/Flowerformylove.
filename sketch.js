let v = [];
let rows = 60, cols = 120;

let canvas;

let pNumSlider, pLenSlider, diameterSlider, pSharpSlider;
let petalNum, pLength, diameter, pSharpness;

let heightSlider, curvatureSlider1, curvatureSlider2;
let flowerHeight, curvature1, curvature2;

let bumpSlider, bumpNumSlider;
let bump, bumpNum;


let flowerColorSlider1, flowerColorSlider2 ,flowerColorSlider3;
let flowerColor1, flowerColor2, flowerColor3; 

let pNum, fD, pLen, pSharp;
let fHeight, curve1, curve2;
let b, bNum;

function setup(){
  canvas = createCanvas(700, 700, WEBGL);
  canvas.class("canvas");

  colorMode(HSB, 317, 86, 69);
  angleMode(DEGREES);
  noStroke();

  petalNum = createDiv();
  petalNum.class("valueDisplay");
  pNumSlider = createSlider(1, 20, 10, 1);
  pNumSlider.class("Slider");

  diameter = createDiv();
  diameter.class("valueDisplay");
  diameterSlider = createSlider(20, 250, 170, 10);
  diameterSlider.class("Slider");

  pLength = createDiv();
  pLength.class("valueDisplay");
  pLenSlider = createSlider(0, 300, 80, 10);
  pLenSlider.class("Slider");

  pSharpness = createDiv();
  pSharpness.class("valueDisplay");
  pSharpSlider = createSlider(0.0, 10.0, 0.9, 0.1);
  pSharpSlider.class("Slider");

  flowerHeight = createDiv();
  flowerHeight.class("valueDisplay");
  heightSlider = createSlider(0, 600, 210, 10);
  heightSlider.class("Slider");

  curvature1 = createDiv();
  curvature1.class("valueDisplay");
  curvatureSlider1 = createSlider(0.0, 4.0, 0.8, 0.1);
  curvatureSlider1.class("Slider");

  curvature2 = createDiv();
  curvature2.class("valueDisplay");
  curvatureSlider2 = createSlider(0.0, 1.0, 0.2, 0.05);
  curvatureSlider2.class("Slider");

  bump = createDiv();
  bump.class("valueDisplay");
  bumpSlider = createSlider(0.0, 5.0, 2.5, 0.5);
  bumpSlider.class("Slider");

  bumpNum = createDiv();
  bumpNum.class("valueDisplay");
  bumpNumSlider = createSlider(0, 20, 8, 1);
  bumpNumSlider.class("Slider");
  
  flowerColor1 = createDiv();
  flowerColor1.class("valueDisplay");
  flowerColorSlider1 = createSlider(0, 360, 317, 1);
  flowerColorSlider1.class("Slider");
  
    
  flowerColor2 = createDiv();
  flowerColor2.class("valueDisplay");
  flowerColorSlider2 = createSlider(0, 200, 86, 1);
  flowerColorSlider2.class("Slider");
  
    
  flowerColor3 = createDiv();
  flowerColor3.class("valueDisplay");
  flowerColorSlider3 = createSlider(0, 100, 69, 1);
  flowerColorSlider3.class("Slider");
}

function draw(){
  clear();
  orbitControl(4, 4);

  rotateX(60);

  pNum = pNumSlider.value();
  fD = diameterSlider.value();
  pLen = pLenSlider.value();
  pSharp = pSharpSlider.value();

  fHeight = heightSlider.value();
  curve1 = curvatureSlider1.value();
  curve2 = curvatureSlider2.value();

  b = bumpSlider.value();
  bNum = bumpNumSlider.value();
	
  color1 = flowerColorSlider1.value();
  color2 = flowerColorSlider2.value();
  color3 = flowerColorSlider3.value();
	
  //fill(flowerColor1, flowerColor2, flowerColor3);//  colorMode(HSB, 317, 86, 69);
  
  for(theta = 0; theta < rows; theta += 1){
    v.push([]);
    for(let phi = 0; phi < cols; phi += 1){
      let r = (pLen*pow(abs(sin(pNum/2*phi*360/cols)),pSharp)+fD) * theta/rows;
      let x = r * cos(phi*360/cols);
      let y = r * sin(phi*360/cols);
      let z = vShape(fHeight, r/100, curve1, curve2, 1.5) - 200+
        bumpiness(b, r/100, bNum, phi*360/cols);

        let pos = createVector(x, y, z);
        v[theta].push(pos);
    }
  }

  for(let theta = 0; theta < v.length; theta++){
    fill(color1, 100-theta*color2*0.01, color3);
    for(let phi = 0; phi < v[theta].length; phi++){
      if(theta < v.length-1 && phi < v[theta].length-1){
        beginShape();
        vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z);
        vertex(v[theta+1][phi].x, v[theta+1][phi].y, v[theta+1][phi].z);
        vertex(v[theta+1][phi+1].x, v[theta+1][phi+1].y, v[theta+1][phi+1].z);
        vertex(v[theta][phi+1].x, v[theta][phi+1].y, v[theta][phi+1].z);
        endShape(CLOSE);
      }else if(theta < v.length-1 && phi == v[theta].length-1){
        beginShape();
        vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z);
        vertex(v[theta][0].x, v[theta][0].y, v[theta][0].z);
        vertex(v[theta+1][0].x, v[theta+1][0].y, v[theta+1][0].z);
        vertex(v[theta+1][phi].x, v[theta+1][phi].y, v[theta+1][phi].z);
        endShape(CLOSE);
      }
    }
  }

  petalNum.html("Yaprak Sayısı: " + pNumSlider.value());
  diameter.html("Çicek Çapı: " + diameterSlider.value());
  pLength.html("Yaprak Uzunluğu: " + pLenSlider.value());
  pSharpness.html("Yaprak Ucu: " + pSharpSlider.value());

  flowerHeight.html("Çicek Uzunluğu: " + heightSlider.value());
  curvature1.html("Kıvrım 1: " + curvatureSlider1.value());
  curvature2.html("Kıvrım 2: " + curvatureSlider2.value());

  bump.html("Yumru A: " + bumpSlider.value());
  bumpNum.html("Yumru Sayısı: " + bumpNumSlider.value());
  flowerColor1.html("Renk1:" + flowerColorSlider1.value())
  flowerColor2.html("Renk2:" + flowerColorSlider2.value())
  flowerColor3.html("Renk3:" + flowerColorSlider3.value())

  v = [];
}

function vShape(A, r, a, b, c){
  return A*pow(Math.E, -b*pow(abs(r), c))*pow(abs(r), a);
}

function bumpiness(A, r, f, angle){
  return 1 + A * pow(r, 2) * sin(f * angle);
}
