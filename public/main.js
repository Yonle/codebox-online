const socket = io()
const codebox = document.getElementById('codebox');
document.getElementById('input').addEventListener('input', () => {
  document.getElementById('box').innerHTML = document.getElementById('input').value
  socket.emit('input', document.getElementById('input').value)
})
socket.on('connect', () => {
 var status = document.getElementById('status')
 status.style['color'] = 'green'
 status.innerHTML = "Connected"
 setTimeout(() => {
  status.style.display = 'none'
 }, 3000)
})
socket.on('global', data => {
  document.getElementById('input').value = data
  document.getElementById('box').innerHTML = data
})
socket.on('disconnect', () => {
 var status = document.getElementById('status')
 status.style['color'] = 'purple'
 status.innerHTML = "Reconnecting...."
})


function hide_cdbox () {
codebox.style.display = 'none';
document.getElementById('cdbox_showbutton').style.display = 'block';
}

function show_cdbox () {
codebox.style.display = 'block';
document.getElementById('cdbox_showbutton').style.display = 'none';
}
