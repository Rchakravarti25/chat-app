const msgerForm = get('.msger-inputarea');
const msgerInput = get('.msger-input');
const msgerChat = get('.msger-chat');
const PERSON_IMG = 'https://image.flaticon.com/icons/svg/145/145867.svg'
var PERSON_NAME = '';
var ROOM = "";
var socket =io.connect(window.location.origin, {
    transports: ['websocket'],
});

$('#connect').on('click', function (event) {
    var x = $("#myname").val();
    var r = $("#mygroup").val();
    console.log("data : "+x);
    if(x){
        PERSON_NAME = x;
        $(this).closest("section").remove();
        $(".msger").removeClass("hide");
        if(r){
            ROOM = r;
            socket.emit('join', ROOM);
        }
        $("#t").append(PERSON_NAME+"  :  "+ROOM);
    }else{
        alert("Person Name Must be Given...!!!  ");
    }
});

socket.on('connected', function (data) {
    console.log(data);
    $('#t').html(data.socketId +"  :  ");
});
socket.on("active-user",function(data){
    $("#online").text(data);
});
//on send msg
msgerForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const msgText = msgerInput.value
  if (!msgText) return
  appendMessage(PERSON_NAME, PERSON_IMG, 'right', msgText)
  msgerInput.value = '';
  if(ROOM){
    socket.emit('msg-group', {room : ROOM , data:{ name: PERSON_NAME, msg: msgText }});
  }else{
    socket.emit('send', { name: PERSON_NAME, msg: msgText });
  }
})

socket.on('msg', function (data) {
  const msgText = data.msg;
  const name = data.name ;
  appendMessage(name, PERSON_IMG, 'left', msgText);
});

function appendMessage(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>`
  msgerChat.insertAdjacentHTML('beforeend', msgHTML)
  msgerChat.scrollTop += 500
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector)
}
function formatDate(date) {
  const h = '0' + date.getHours()
  const m = '0' + date.getMinutes()
  return `${h.slice(-2)}:${m.slice(-2)}`
}
