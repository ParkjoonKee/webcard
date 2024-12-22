//전역변수

let faceType = 1;
let faceX = 200;
let faceY = 150;
let faceScale = 0.5;

// 눈 변수

let snow1;
let snow2;
let snow1Y = 0;
let snow2Y = 0;

function preload() {
  snow1 = loadImage('snow1.png');
  snow2 = loadImage('snow2.png');
}

function setup() {
  createCanvas(400, 600);
  getParam();
}

function draw() {
  background('darkgreen');

  // mouseX, mouseY
  fill(235);
  ellipse(200, 450, 250, 250);
  fill(245);
  ellipse(200, 300, 200, 200);
  face(faceX, faceY, faceType);
  snow();
}

function snow() {
  snow1Y = (snow1Y + 1) % height;

  image(snow1, 0, snow1Y - height, 400, 600);
  image(snow1, 0, snow1Y, 400, 600);

  snow2Y = (snow2Y + 2) % height;

  image(snow2, 0, snow2Y - height, 400, 600);
  image(snow2, 0, snow2Y, 400, 600);
}

function mouseClicked() {
  let d = dist(faceX, faceY, mouseX, mouseY);
  if (d < 150 * faceScale) {
    faceType = faceType + 1;
    if (faceType > 3) {
      faceType = 1;
    }
    setParam();
  }
}

function setParam() {
  let url = new URL(location.href); // 주소가져오기
  url.searchParams.set('faceType', faceType); // 주소에 값 넣기
  history.pushState({}, null, url); // 주소창에 반영하기
}

function getParam() {
  let url = new URL(location.href);
  faceType = url.searchParams.get('faceType');
  if (faceType == null) {
    faceType = 1;
  }
}

function face(x, y, type) {
  let d = dist(x, y, mouseX, mouseY);

  push();
  translate(x, y);
  scale(faceScale);

  // 조건문 - 소괄호가 true일 때만 중괄호 실행

  if (d < 150 * faceScale) {
    fill('pink');
  } else {
    fill('lightgray');
  }
  ellipse(0, 0, 300, 300);

  // 눈동자 만들기
  push();
  translate(0, -5);
  fill('white');
  ellipse(-60, 0, 100, 100);
  ellipse(60, 0, 100, 100);
  ellipse(-60, 0, 50, 50);
  ellipse(60, 0, 50, 50);
  pop();

  // 모자 만들기
  push();
  push();
  fill('red');
  triangle(0, -180, -150, -80, 150, -80);
  pop();
  fill('green');
  ellipse(0, -175, 30, 30);
  rectMode(CENTER);
  rect(0, -80, 300, 30);
  pop();

  // 목도리 만들기
  push();
  rectMode(CENTER);
  fill('orange');
  rect(0, 150, 300, 60);
  push();
  translate(150, 0);
  fill('darkorange');
  rect(0, 150 - 20, 60, 10);
  rect(0, 150, 60, 10);
  rect(0, 150 + 20, 60, 10);
  pop();
  pop();
  // 코1 만들기 - 네모 // 코 만들기 전에 기준점을 가운데로

  if (type == 1) {
    rectMode(CENTER);
    rect(0, 60, 20, 60);
    ellipse(0, 90, 80, 20);
  }

  // 코2 만들기 - 동그라미

  if (type == 2) {
    ellipse(0, 60, 50, 20);
    noFill();
    arc(0, 0, 200, 200, radians(60), radians(120));
  }

  // 코3 만들기 - 삼각형
  if (type == 3) {
    push();
    translate(0, 30);
    triangle(100, 0, 0, -20, 0, 20);
    pop();
    rectMode(CENTER);
    rect(0, 90, 100, 10);
  }

  // 입 만들기 1 - 원

  //

  // 입 만들기 2 - arc. 동그라미를 그려놓고 아래만 남기는 방식. arc 매개 변수 6개인데, 마지막 2개가 각도. 호도법. 0~2파이 사이의 값. 오른쪽이 첫 0도.
  // 호도법을 각도법으로 바꾸려면 radians(각도)
  // arc는 기본으로 면이 칠해짐

  // noFill();
  // arc(0,0,200,200, radians(60), radians(120));

  // 입 만들기 3 - 네모

  pop();

  // line(x, y, mouseX, mouseY);
  // text(d, mouseX, mouseY);
}
