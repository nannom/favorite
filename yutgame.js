const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.lineCap = 'round';  // 선 끝을 둥글게
ctx.lineJoin = 'round'; // 선 교차 부분을 둥글게
var yuts = [true,true,true,true];
let yutname = ["","도","개","걸","윷","모","빽도"];
let anotheryut = new Array(31).fill(0);
let yutboardcursor = -1;
let selectedhorse = -1;
function drawRoundedRectangle(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y); // 시작점
  
    // 위쪽 선
    ctx.lineTo(x + width - radius, y);
    ctx.arc(x + width - radius, y + radius, radius, 1.5 * Math.PI, 2 * Math.PI); // 우측 상단 둥근 모서리
  
    // 오른쪽 선
    ctx.lineTo(x + width, y + height - radius);
    ctx.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * Math.PI); // 우측 하단 둥근 모서리
  
    // 아래쪽 선
    ctx.lineTo(x + radius, y + height);
    ctx.arc(x + radius, y + height - radius, radius, 0.5 * Math.PI, Math.PI); // 좌측 하단 둥근 모서리
  
    // 왼쪽 선
    ctx.lineTo(x, y + radius);
    ctx.arc(x + radius, y + radius, radius, Math.PI, 1.5 * Math.PI); // 좌측 상단 둥근 모서리
  
    ctx.closePath();
    ctx.stroke();
    ctx.fill(); // 채우기 (선택 사항)
}
function drawyutboard() {
    ctx.strokeStyle = '#FFC14F';
    ctx.fillStyle = "#FFC14F";
    drawRoundedRectangle(38,38,826,826,20);
    ctx.strokeStyle = "#C66121";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(75,75);
    ctx.lineTo(75,825);
    ctx.lineTo(825,825);
    ctx.lineTo(825,75);
    ctx.lineTo(75,75);
    ctx.moveTo(75,75);
    ctx.lineTo(825,825);
    ctx.moveTo(825,75);
    ctx.lineTo(75,825);
    ctx.stroke();
    ctx.fillStyle = "#C66121";
    ctx.beginPath();
    ctx.arc(75,75,25,0,Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(75,825,25,0,Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(825,825,25,0,Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(825,75,25,0,Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#C66121";
    ctx.fillStyle = "#FFFFFF";
    ctx.lineWidth = 5;
    for(var i = 1;i<=4;i++) {
        ctx.beginPath();
        ctx.arc(75,75 + (150 * i),16,0,Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
    for(var i = 1;i<=4;i++) {
        ctx.beginPath();
        ctx.arc(75 + (150 * i),75,16,0,Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
    for(var i = 1;i<=4;i++) {
        ctx.beginPath();
        ctx.arc(825,75 + (150 * i),16,0,Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
    for(var i = 1;i<=4;i++) {
        ctx.beginPath();
        ctx.arc(75 + (150 * i),825,16,0,Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
    for(var i = 1;i<=5;i++) {
        ctx.beginPath();
        ctx.arc(75 + (125 * i),75 + (125 * i),16,0,Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
    for(var i = 1;i<=5;i++) {
        ctx.beginPath();
        ctx.arc(825 - (125 * i),75 + (125 * i),16,0,Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
    ctx.fillStyle = "#C66121";
    ctx.beginPath();
    ctx.arc(450,450,25,0,Math.PI * 2);
    ctx.fill();
}
function drawOctagon(centerX, centerY, width) {
    const sides = 8; // 팔각형은 8변
    const angle = Math.PI * 2 / sides; // 각도 계산

    // 팔각형의 꼭짓점 계산
    const points = [];
    for (let i = 0; i < sides; i++) {
        const x = centerX + width * Math.cos(i * angle);
        const y = centerY + width * Math.sin(i * angle);
        points.push({ x, y });
    }

    // 정팔각형 그리기
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.fill();  // 팔각형 내부를 채움
    ctx.stroke();  // 외곽선 그리기
}
function seededRandomGenerator(seed) {
    let currentSeed = seed % 2147483647;
    if (currentSeed <= 0) currentSeed += 2147483646;

    return function() {
        currentSeed = (currentSeed * 16807) % 2147483647;
        return (currentSeed - 1) / 2147483646;
    };
}
let pos0rand = seededRandomGenerator(13324248123);
function drawhorse(position) {
    if(position == -1) {

    }
    else if(position == 0) {
        drawOctagon(450 + (pos0rand() * 80 - 40),670 + (pos0rand() * 80 - 40),20);
        anotheryut[0] += 1;
    }
    else if(position <= 4) {
        drawOctagon(825,825 - (150 * (position)) + (anotheryut[position] * 5),20);
        anotheryut[position] += 1;
    }
    else if(position<=9) {
        drawOctagon(825 - (150 * (position - 5)),75 + (anotheryut[position] * 5),20);
        anotheryut[position] += 1;
    }
    else if(position<=14) {
        drawOctagon(75,75 + (150 * (position - 10)) + (anotheryut[position] * 5),20);
        anotheryut[position] += 1;
    }
    else if(position<=20) {
        drawOctagon(75 + (150 * (position - 15)),825 + (anotheryut[position] * 5),20);
        anotheryut[position] += 1;
    }
    else if(position<=25) {
        drawOctagon(825 - (125 * (position - 20)),75 + (125 * (position - 20)) + (anotheryut[position] * 5),20);
        anotheryut[position] += 1;
    }
    else if(position<=30) {
        drawOctagon(75 + (125 * (position - 25)),75 + (125 * (position - 25)) + (anotheryut[position] * 5),20);
        anotheryut[position] += 1;
    }
}
function drawyut() {
    for(var i = 0;i<4;i++) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 10;
        if(yuts[i]) {
            ctx.fillStyle = "#D8A83E";
            drawRoundedRectangle(1100 + (120 * i),37.5,80,300,5);
            for(var j = 0;j<3;j++) {
                ctx.beginPath();
                ctx.moveTo(1110 + (120 * i),57.5 + (100 * j));
                ctx.lineTo(1110 + (120 * i) + 60,57.5 + (100 * j) + 60);
                ctx.moveTo(1110 + (120 * i) + 60,57.5 + (100 * j));
                ctx.lineTo(1110 + (120 * i),57.5 + (100 * j) + 60);
                ctx.stroke();
            }
        }
        else {
            ctx.fillStyle = "#BC9236";
            drawRoundedRectangle(1100 + (120 * i),37.5,80,300,5);
            if(i == 0) {
                ctx.strokeStyle = "#FF0000";
                ctx.beginPath();
                ctx.moveTo(1110,57.5 + (100 * 2));
                ctx.lineTo(1110 + 60,57.5 + (100 * 2) + 60);
                ctx.moveTo(1110 + 60,57.5 + (100 * 2));
                ctx.lineTo(1110,57.5 + (100 * 2) + 60);
                ctx.stroke();
            }
        }
    }
}
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');  // 모든 쿠키를 ';' 기준으로 분리
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);  // 공백 제거
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);  // 쿠키 값 반환
        }
    }
    return null;  // 쿠키가 없으면 null 반환
}
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  // 'days'만큼 날짜를 더함
    const expires = "expires=" + date.toUTCString();  // UTC 형식으로 변환
    document.cookie = name + "=" + value + ";" + expires + ";path=/";  // 쿠키 설정
}
let datas = {};
let lobby_button_hover = false;
let lobby_charater_hover = false;
let room_out_hover = false;
let room_start_hover = false;
canvas.addEventListener("mousemove",(event) => {
    const rect = canvas.getBoundingClientRect();
    const cssX = event.clientX - rect.left;
    const cssY = event.clientY - rect.top;

    // CSS 크기와 논리 크기 비율 계산
    const scaleX = canvas.width / rect.width;   // X축 비율
    const scaleY = canvas.height / rect.height; // Y축 비율

    // 논리 캔버스 좌표 계산
    const canvasX = cssX * scaleX;
    const canvasY = cssY * scaleY;
    lobby_button_hover = false;
    lobby_charater_hover = false;
    document.body.style.cursor = "default";
    room_out_hover = false;
    room_start_hover = false;
    if(datas.state == 1) {
        if(204 <= canvasX && canvasX <= 296 && 54 <= canvasY && canvasY <= 86) {
            lobby_button_hover = true;
            document.body.style.cursor = "pointer";
        }
        if(304 <= canvasX && canvasX <= 396 && 54 <= canvasY && canvasY <= 86) {
            lobby_charater_hover = true;
            document.body.style.cursor = "pointer";
        }
        for(let i = 0;i<datas.rooms.length;i++) {
            ctx.fillStyle = '#FFFFFF';
            drawRoundedRectangle(220,110 + (70 * i),1360,50,10);
            ctx.fillStyle = '#000000';
            ctx.fillText(datas.rooms[i].name,240,150 + (70 * i));
            if(220 <= canvasX && canvasX <= 1580 && 110+(70*i) <= canvasY && canvasY <= 160+(70*i)) {
                document.body.style.cursor = "pointer";
            }
        }

        drawlobby(datas);
    }
    else if(datas.state == 2) {
        if(1445 <= canvasX && canvasX <= 1595 && 5 <= canvasY && canvasY <= 45) {
            document.body.style.cursor = "pointer";
            room_out_hover = true;
        }
        if(room_out_hover) {
            ctx.fillStyle = "#FF5555";
        }
        else {
            ctx.fillStyle = "#FF2222";
        }
        drawRoundedRectangle(1445,5,150,40,20);
        ctx.fillStyle = '#000000';
        ctx.font = "25px Arial";         // 폰트 크기와 스타일
        ctx.textAlign = "center";        // 정렬: left, center, right, start, end
        ctx.fillText("나가기",1520,35);
        if(1290 <= canvasX && canvasX <= 1440 && 5 <= canvasY && canvasY <= 45) {
            document.body.style.cursor = "pointer";
            room_start_hover = true;
            ctx.fillStyle = '#66FF66';
        }
        else {
            ctx.fillStyle = '#00FF00';
        }
        let isowner = false;
        datas.players.forEach(({name,roles}) => {
            if(roles == 'leader') {
                if(name == datas.username) {
                    isowner = true;
                }
            }
        });
        if(isowner) {
            drawRoundedRectangle(1290,5,150,40,20);
            ctx.fillStyle = '#000000';
            ctx.font = "25px Arial";         // 폰트 크기와 스타일
            ctx.textAlign = "center";        // 정렬: left, center, right, start, end
            ctx.fillText("게임 시작",1365,35);
        }
    }
    else if(datas.state == 3) {
        if(1100 <= canvasX && canvasX <= 1550 && 380 <= canvasY && canvasY <= 460) {
            if(datas.turn[0].name == datas.username && datas.game.state == 0) {
                document.body.style.cursor = "pointer";16,0,Math.PI * 2
            }
            else {
                document.body.style.cursor = "not-allowed";
            }
        }
        yutboardcursor = -1;
        function ishere(x,y,width) {
            return (x - (width / 2) <= canvasX && canvasX <= x + (width / 2) && y - (width / 2) <= canvasY && canvasY <= y + (width / 2))
        }
        if(ishere(450,670,80)) {
            yutboardcursor = 0;
        }
        for(let i = 1;i<=30;i++) {
            if(i <= 4) {
                if(ishere(825,825 - (150 * (i)),20)) {
                    yutboardcursor = i;
                    break;
                }
            }
            else if(i<=9) {
                if(ishere(825 - (150 * (i - 5)),75,20)) {
                    yutboardcursor = i;
                    break;
                }
            }
            else if(i<=14) {
                if(ishere(75,75 + (150 * (i - 10)),20)) {
                    yutboardcursor = i;
                    break;
                }
            }
            else if(i<=20) {
                if(ishere(75 + (150 * (i - 15)),825,20)) {
                    yutboardcursor = i;
                    break;
                }
            }
            else if(i<=25) {
                if(ishere(825 - (125 * (i - 20)),75 + (125 * (i - 20)),20)) {
                    yutboardcursor = i;
                    break;
                }
            }
            else if(i<=30) {
                if(ishere(75 + (125 * (i - 25)),75 + (125 * (i - 25)),20)) {
                    yutboardcursor = i;
                    break;
                }
            }
        }
        drawyutboard();
        anotheryut.fill(0);
        pos0rand = seededRandomGenerator(13324248123);
        ctx.lineWidth = 2;
        datas.horses1.forEach(({where}) => {
            ctx.fillStyle = '#0000FF';
            if(yutboardcursor == where && datas.game.state == 1) {
                ctx.strokeStyle = '#00FF00';
            }
            else {
                ctx.strokeStyle = '#000000';
                if(selectedhorse == where && datas.game.state == 1) {
                    ctx.strokeStyle = '#FFFFFF';
                }
            }
            drawhorse(where);
        });
        datas.horses2.forEach(({where}) => {
            ctx.fillStyle = '#FF0000';
            if(yutboardcursor == where && datas.game.state == 1) {
                ctx.strokeStyle = '#00FF00';
            }
            else {
                ctx.strokeStyle = '#000000';
                if(selectedhorse == where && datas.game.state == 1) {
                    ctx.strokeStyle = '#FFFFFF';
                }
            }
            drawhorse(where);
        });
        datas.horses1.forEach(({where,cango}) => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            ctx.strokeStyle = '#0000FF';
            if(selectedhorse == where && datas.game.state == 1) {
                cango.forEach((value) => {
                    if(value == -1) {
                        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
                        ctx.strokeStyle = '#FFFF00';
                        drawhorse(20);
                        anotheryut[20] -= 1;
                        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
                        ctx.strokeStyle = '#FF0000';
                    }
                    else {
                        drawhorse(value);
                        anotheryut[value] -= 1;
                    }
                });
            }
        });
        datas.horses2.forEach(({where,cango}) => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            ctx.strokeStyle = '#FF0000';
            if(selectedhorse == where && datas.game.state == 1) {
                cango.forEach((value) => {
                    if(value == -1) {
                        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
                        ctx.strokeStyle = '#FFFF00';
                        drawhorse(20);
                        anotheryut[20] -= 1;
                        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
                        ctx.strokeStyle = '#FF0000';
                    }
                    else {
                        drawhorse(value);
                        anotheryut[value] -= 1;
                    }
                });
            }
        });
    }
});
function drawlobby() {
    ctx.lineWidth = 2;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0,0,1600,900);
    ctx.beginPath();
    ctx.moveTo(0,50);
    ctx.lineTo(1600,50);
    ctx.stroke();
    ctx.font = "30px Arial";         // 폰트 크기와 스타일
    ctx.fillStyle = "black";          // 텍스트 색상
    ctx.textAlign = "left";        // 정렬: left, center, right, start, end
    ctx.fillText(datas.username,5,45);
    ctx.beginPath();
    ctx.moveTo(200,50);
    ctx.lineTo(200,900);
    ctx.stroke();
    ctx.font = "20px Arial";         // 폰트 크기와 스타일
    for(let i = 0;i<datas.players.length;i++) {
        ctx.fillText(datas.players[i].name,10,95 + (30 * i));
    }
    ctx.beginPath();
    ctx.moveTo(200,90);
    ctx.lineTo(1600,90);
    ctx.stroke();
    if(lobby_button_hover) {
        ctx.fillStyle = '#FFD59B';
    }
    else {
        ctx.fillStyle = '#FFC260';
    }
    ctx.strokeStyle = '#000000';
    drawRoundedRectangle(204,54,92,32,10);
    ctx.fillStyle = 'black';
    ctx.fillText("방만들기",210,78);
    if(lobby_charater_hover) {
        ctx.fillStyle = '#66FF66';
    }
    else {
        ctx.fillStyle = '#11FF11';
    }
    ctx.strokeStyle = '#000000';
    drawRoundedRectangle(304,54,92,32,10);
    ctx.fillStyle = 'black';
    ctx.fillText("캐릭터",320,78);
    ctx.lineWidth = 5;
    ctx.font = "30px Arial";         // 폰트 크기와 스타일
    for(let i = 0;i<datas.rooms.length;i++) {
        ctx.fillStyle = '#FFFFFF';
        drawRoundedRectangle(220,110 + (70 * i),1360,50,10);
        ctx.fillStyle = '#000000';
        ctx.fillText(datas.rooms[i].name,240,150 + (70 * i));
    }
}
function drawRoundedImage(ctx, img, x, y, width, height, radius) {
    // 둥근 모서리 경로 정의
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();

    // 클리핑 경로 설정
    ctx.clip();

    // 이미지 그리기
    ctx.drawImage(img, x, y, width, height);

    // 클리핑 경로 해제
    ctx.restore();
}
function drawroom() {
    ctx.lineWidth = 2;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0,0,1600,900);
    ctx.beginPath();
    ctx.moveTo(0,50);
    ctx.lineTo(1600,50);
    ctx.stroke();
    ctx.font = "30px Arial";         // 폰트 크기와 스타일
    ctx.fillStyle = "black";          // 텍스트 색상
    ctx.textAlign = "left";        // 정렬: left, center, right, start, end
    ctx.fillText(datas.roomname,5,45);
    ctx.fillStyle = '#FFFFFF';
    drawRoundedRectangle(20,130,300,540,20);
    drawRoundedRectangle(20,70,300,60,20);
    drawRoundedRectangle(340,130,300,540,20);
    drawRoundedRectangle(340,70,300,60,20);
    drawRoundedRectangle(660,130,300,540,20);
    drawRoundedRectangle(660,70,300,60,20);
    drawRoundedRectangle(980,130,300,540,20);
    drawRoundedRectangle(980,70,300,60,20);
    const images = [
        { src: "char.png", x: 20, y: 130 },
        { src: "char.png", x: 340, y: 130 },
        { src: "char.png", x: 660, y: 130 },
        { src: "char.png", x: 980, y: 130 },
    ];
    let isowner = false;
    {
        let i = 0;
        images.forEach(({ src, x, y }) => {
            if(i < datas.players.length) {
                const img = new Image();
                img.onload = function () {
                    const width = 300;
                    const height = 540;
                    const radius = 20;
            
                    // 상태 저장
                    ctx.save();
            
                    // 둥근 이미지 그리기
                    drawRoundedImage(ctx, img, x, y, width, height, radius);
                };
                img.src = src;
            }
            i++;
        });
        i = 0;
        ctx.textAlign = "center";        // 정렬: left, center, right, start, end
        datas.players.forEach(({name}) => {
            if(datas.players[i].roles == "leader") {
                ctx.fillStyle = '#FF0000';
                if(datas.players[i].name == datas.username) {
                    isowner = true;
                }
            }
            else {
                ctx.fillStyle = '#000000';
            }
            ctx.fillText(name,170 + (320 * i),115);
            i++;
        });
    }
    if(room_out_hover) {
        ctx.fillStyle = "#FF5555";
    }
    else {
        ctx.fillStyle = "#FF2222";
    }
    drawRoundedRectangle(1445,5,150,40,20);
    ctx.fillStyle = '#000000';
    ctx.font = "25px Arial";         // 폰트 크기와 스타일
    ctx.textAlign = "center";        // 정렬: left, center, right, start, end
    ctx.fillText("나가기",1520,35);
    ctx.fillStyle = '#00FF00';
    if(isowner) {
        drawRoundedRectangle(1290,5,150,40,20);
        ctx.fillStyle = '#000000';
        ctx.font = "25px Arial";         // 폰트 크기와 스타일
        ctx.textAlign = "center";        // 정렬: left, center, right, start, end
        ctx.fillText("게임 시작",1365,35);
    }
}
function connect() {
    let gamedatas = [];
    const ws = new WebSocket("wss://yut.corexaen.com:21543");

    ws.onopen = () => {
        console.log("WebSocket 연결 성공");
        ws.send(getCookie("uid"));
    };

    ws.onmessage = (event) => {
        console.log("서버로부터 메시지:", event.data);
        const jsondata = JSON.parse(event.data);
        if(jsondata.answer == "error") {
            datas = jsondata;
            alert(jsondata.message);
        }
        else if(jsondata.state == 1) {
            datas = jsondata;
            drawlobby();
        }
        else if(jsondata.state == 2) {
            datas = jsondata;
            drawroom();
        }
        else if(jsondata.state == 3) {
            gamedatas.push(jsondata);
        }
    };
    document.getElementById("makeroomForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById('makeroomname').value;
        const senddata = {
            request: "makeroom",
            roomname: username
        };
        ws.send(JSON.stringify(senddata));
        closeOverlay();
        closemakeroom();
    });
    canvas.addEventListener("click",(event) => {
        const rect = canvas.getBoundingClientRect();
        const cssX = event.clientX - rect.left;
        const cssY = event.clientY - rect.top;
    
        // CSS 크기와 논리 크기 비율 계산
        const scaleX = canvas.width / rect.width;   // X축 비율
        const scaleY = canvas.height / rect.height; // Y축 비율
    
        // 논리 캔버스 좌표 계산
        const canvasX = cssX * scaleX;
        const canvasY = cssY * scaleY;
        console.log(canvasX + "," + canvasY);
        if(datas.state == 1) {
            if(lobby_button_hover) {
                document.body.style.cursor = "default";
                showOverlay();
                showmakeroom();
            }
            for(let i = 0;i<datas.rooms.length;i++) {
                if(220 <= canvasX && canvasX <= 1580 && 110+(70*i) <= canvasY && canvasY <= 160+(70*i)) {
                    const senddata = {
                        request: "enterroom",
                        roomnumber: i
                    };
                    ws.send(JSON.stringify(senddata));
                }
            }
        }
        else if(datas.state == 2) {
            if(room_out_hover) {
                const senddata = {
                    request:"leaveroom"
                };
                ws.send(JSON.stringify(senddata));
            }
            if(room_start_hover) {
                const senddata = {
                    request:"start"
                };
                ws.send(JSON.stringify(senddata));
            }
        }
        else if(datas.state == 3) {
            if(1100 <= canvasX && canvasX <= 1550 && 380 <= canvasY && canvasY <= 460) {
                if(datas.turn[0].name == datas.username && datas.game.state == 0) {
                    const senddata = {
                        request:"roll"
                    };
                    ws.send(JSON.stringify(senddata));
                }
            }
            if(datas.turn[0].name == datas.username && datas.game.state == 1) {
                if(yutboardcursor != -1) {
                    if(selectedhorse != -1) {
                        const senddata = {
                            request:"move",
                            firstpoint:selectedhorse,
                            secondpoint:yutboardcursor
                        }
                        ws.send(JSON.stringify(senddata));
                        selectedhorse = -1;
                    }
                    else {
                        if(datas.turn[0].team == 1) {
                            let isthere = false;
                            datas.horses1.forEach(({where}) => {
                                if(yutboardcursor == where) {
                                    isthere = true;
                                }
                            });
                            if(isthere) {
                                selectedhorse = yutboardcursor;
                            }
                        }
                        else {
                            let isthere = false;
                            datas.horses2.forEach(({where}) => {
                                if(yutboardcursor == where) {
                                    isthere = true;
                                }
                            });
                            if(isthere) {
                                selectedhorse = yutboardcursor;
                            }
                        }
                    }
                }
                else {
                    selectedhorse = -1;
                }
            }
        }
    });
    function gametherad() {
        if(gamedatas.length > 0) {
            const message = gamedatas.shift();
            datas = message;
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0,0,1600,900);
            drawyutboard();
            yuts = message.yuts;
            drawyut();
            ctx.fillStyle = '#AAAAAA';
            ctx.strokeStyle = '#555555';
            drawRoundedRectangle(922,30,120,840,20);
            for(let i = 0;i < message.turn.length;i++) {
                if(message.turn[i].team == 1) {
                    ctx.fillStyle = '#0000FF';
                }
                else {
                    ctx.fillStyle = '#FF0000';
                }
                ctx.fillText(message.turn[i].name,982,70 + (30 * i));
            }
            if(message.turn[0].name == message.username && message.game.state == 0) {
                ctx.fillStyle = '#B8FF89';
                ctx.strokeStyle = '#888888';
            }
            else {
                ctx.fillStyle = '#555555';
            }
            drawRoundedRectangle(1100,380,450,80,20);
            ctx.fillStyle = '#000000';
            ctx.fillText("던지기",1325,430);
            for(let i = 0;i<message.results.length;i++) {
                if(message.results[i] == -1) {
                    message.results[i] = 6;
                }
                ctx.fillStyle = '#AAAAAA';
                ctx.strokeStyle = '#555555';
                drawRoundedRectangle(922,810 + (-50 * i),120,40,10);
                ctx.fillStyle = '#000000';
                ctx.fillText(yutname[message.results[i]],982,840 + (-50 * i));
            }
            drawyutboard();
            anotheryut.fill(0);
            pos0rand = seededRandomGenerator(13324248123);
            ctx.lineWidth = 2;
            datas.horses1.forEach(({where}) => {
                ctx.fillStyle = '#0000FF';
                if(yutboardcursor == where && datas.game.state == 1) {
                    ctx.strokeStyle = '#00FF00';
                }
                else {
                    ctx.strokeStyle = '#000000';
                    if(selectedhorse == where && datas.game.state == 1) {
                        ctx.strokeStyle = '#FFFFFF';
                    }
                }
                drawhorse(where);
            });
            datas.horses2.forEach(({where}) => {
                ctx.fillStyle = '#FF0000';
                if(yutboardcursor == where && datas.game.state == 1) {
                    ctx.strokeStyle = '#00FF00';
                }
                else {
                    ctx.strokeStyle = '#000000';
                    if(selectedhorse == where && datas.game.state == 1) {
                        ctx.strokeStyle = '#FFFFFF';
                    }
                }
                drawhorse(where);
            });
            datas.horses1.forEach(({where,cango}) => {
                ctx.fillStyle = 'rgba(0, 0, 0, 0)';
                ctx.strokeStyle = '#0000FF';
                if(selectedhorse == where && datas.game.state == 1) {
                    cango.forEach((value) => {
                        if(value == -1) {
                            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
                            ctx.strokeStyle = '#FFFF00';
                            drawhorse(20);
                            anotheryut[20] -= 1;
                            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
                            ctx.strokeStyle = '#FF0000';
                        }
                        else {
                            drawhorse(value);
                            anotheryut[value] -= 1;
                        }
                    });
                }
            });
            datas.horses2.forEach(({where,cango}) => {
                ctx.fillStyle = 'rgba(0, 0, 0, 0)';
                ctx.strokeStyle = '#FF0000';
                if(selectedhorse == where && datas.game.state == 1) {
                    cango.forEach((value) => {
                        if(value == -1) {
                            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
                            ctx.strokeStyle = '#FFFF00';
                            drawhorse(20);
                            anotheryut[20] -= 1;
                            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
                            ctx.strokeStyle = '#FF0000';
                        }
                        else {
                            drawhorse(value);
                            anotheryut[value] -= 1;
                        }
                    });
                }
            });
        }
        requestAnimationFrame(gametherad);
    }
    requestAnimationFrame(gametherad);
    return ws;
}
function showLogin() {
    const loginModal = document.getElementById("loginModal");

    loginModal.style.display = "block";  // 로그인 창 보이기

    // 애니메이션 적용
    setTimeout(() => {
        loginModal.style.opacity = "1";  // 로그인 창의 투명도 변경
        loginModal.style.transform = "translate(-50%, -50%) scale(1)";  // 로그인 창 크기 및 위치 변경
    }, 10);  // 조금 기다린 후 애니메이션 시작
}

// 로그인 창을 닫는 함수
function closeLogin() {
    const loginModal = document.getElementById("loginModal");

    loginModal.style.opacity = "0";  // 로그인 창의 투명도 변경
    loginModal.style.transform = "translate(-50%, -50%) scale(0.9)";  // 로그인 창 크기 축소

    // 애니메이션이 끝난 후 display를 none으로 변경하여 실제로 숨기기
    setTimeout(() => {
        loginModal.style.display = "none";  // 로그인 창 숨기기
    }, 300);  // 애니메이션이 끝나는 시간(0.3초) 후에 실행
}
function showSignup() {
    const loginModal = document.getElementById("signupModal");

    loginModal.style.display = "block";  // 로그인 창 보이기

    // 애니메이션 적용
    setTimeout(() => {
        loginModal.style.opacity = "1";  // 로그인 창의 투명도 변경
        loginModal.style.transform = "translate(-50%, -50%) scale(1)";  // 로그인 창 크기 및 위치 변경
    }, 10);  // 조금 기다린 후 애니메이션 시작
}

// 로그인 창을 닫는 함수
function closeSignup() {
    const loginModal = document.getElementById("signupModal");
    loginModal.style.opacity = "0";  // 로그인 창의 투명도 변경
    loginModal.style.transform = "translate(-50%, -50%) scale(0.9)";  // 로그인 창 크기 축소

    // 애니메이션이 끝난 후 display를 none으로 변경하여 실제로 숨기기
    setTimeout(() => {
        loginModal.style.display = "none";  // 로그인 창 숨기기
    }, 300);  // 애니메이션이 끝나는 시간(0.3초) 후에 실행
}
function showmakeroom() {
    const loginModal = document.getElementById("makeroomModal");

    loginModal.style.display = "block";  // 로그인 창 보이기

    // 애니메이션 적용
    setTimeout(() => {
        loginModal.style.opacity = "1";  // 로그인 창의 투명도 변경
        loginModal.style.transform = "translate(-50%, -50%) scale(1)";  // 로그인 창 크기 및 위치 변경
    }, 10);  // 조금 기다린 후 애니메이션 시작
}

// 로그인 창을 닫는 함수
function closemakeroom() {
    const loginModal = document.getElementById("makeroomModal");
    loginModal.style.opacity = "0";  // 로그인 창의 투명도 변경
    loginModal.style.transform = "translate(-50%, -50%) scale(0.9)";  // 로그인 창 크기 축소

    // 애니메이션이 끝난 후 display를 none으로 변경하여 실제로 숨기기
    setTimeout(() => {
        loginModal.style.display = "none";  // 로그인 창 숨기기
    }, 300);  // 애니메이션이 끝나는 시간(0.3초) 후에 실행
}
function showmakeroom() {
    const loginModal = document.getElementById("makeroomModal");

    loginModal.style.display = "block";  // 로그인 창 보이기

    // 애니메이션 적용
    setTimeout(() => {
        loginModal.style.opacity = "1";  // 로그인 창의 투명도 변경
        loginModal.style.transform = "translate(-50%, -50%) scale(1)";  // 로그인 창 크기 및 위치 변경
    }, 10);  // 조금 기다린 후 애니메이션 시작
}

// 로그인 창을 닫는 함수
function closemakeroom() {
    const loginModal = document.getElementById("makeroomModal");
    loginModal.style.opacity = "0";  // 로그인 창의 투명도 변경
    loginModal.style.transform = "translate(-50%, -50%) scale(0.9)";  // 로그인 창 크기 축소

    // 애니메이션이 끝난 후 display를 none으로 변경하여 실제로 숨기기
    setTimeout(() => {
        loginModal.style.display = "none";  // 로그인 창 숨기기
    }, 300);  // 애니메이션이 끝나는 시간(0.3초) 후에 실행
}
function showOverlay() {
    const overlay = document.getElementById("overlay");

    overlay.style.display = "block";  // 검은색 배경 보이기
    setTimeout(() => {
        overlay.style.opacity = "1";  // 검은색 배경의 투명도 변경
    }, 10);  // 조금 기다린 후 애니메이션 시작
}
// 로그인 창을 닫는 함수
function closeOverlay() {
    const overlay = document.getElementById("overlay");

    overlay.style.opacity = "0";  // 검은색 배경의 투명도 변경
    setTimeout(() => {
        overlay.style.display = "none";  // 검은색 배경 숨기기
    }, 300);  // 애니메이션이 끝나는 시간(0.3초) 후에 실행
}
document.getElementById('loginForm').addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginusername').value;
    const password = document.getElementById('loginpassword').value;
    
    // 로그인 데이터 객체
    const loginData = {
      request:  "login",
      username: username,
      password: password
    };
    try {
        const response = await fetch('https://yut.corexaen.com:21543', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
        const result = await response.json();
        if(result.answer == 'error') {
            alert(result.message);
        }
        else {
            setCookie("uid",result.uid,10);
            location.reload();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById('signupusername').value;
    const password = document.getElementById('signuppassword').value;
    const password2 = document.getElementById('signuppassword2').value;
    if(password2 == password) {
        // 로그인 데이터 객체
        const loginData = {
        request:  "signup",
        username: username,
        password: password
        };
        try {
            const response = await fetch('https://yut.corexaen.com:21543', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            const result = await response.json();
            if(result.answer == 'error') {
                alert(result.message);
            }
            else {
                setCookie("uid",result.uid,10);
                location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }
    else {
        alert("비밀번호와 비밀번호 확인이 다릅니다")
    }
});
var uid = getCookie("uid");
if(uid == null) {
    showOverlay();
    showLogin();
}
else {
    connect();
}
function updateViewportSize() {
            const body = document.body;
            const message = document.getElementById('message');

            // 현재 화면의 가로, 세로 크기를 계산
            const width = window.innerWidth;
            const height = window.innerHeight;

            // 화면 방향에 따라 vw/vh를 재설정
            if (width < height) {
                // 세로 모드일 경우
                document.documentElement.style.setProperty('--vw', `${height}px`);
                document.documentElement.style.setProperty('--vh', `${width}px`);
                body.style.transform = 'rotate(90deg)';
                message.style.display = 'block';
            } else {
                // 가로 모드일 경우
                document.documentElement.style.setProperty('--vw', `${width}px`);
                document.documentElement.style.setProperty('--vh', `${height}px`);
                body.style.transform = 'rotate(0deg)';
                message.style.display = 'none';
            }
        }

        // 초기 크기 설정
        updateViewportSize();

        // 화면 방향 변경 감지
        window.addEventListener('resize', updateViewportSize);
        window.addEventListener('orientationchange', updateViewportSize);
