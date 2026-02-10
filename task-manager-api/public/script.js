const API = "/api";

function el(id){return document.getElementById(id)}

function showMessage(text, timeout = 3000){
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerText = text;
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), timeout);
}

async function register(){
  const username = el('regUsername')?.value?.trim();
  const email = el('regEmail')?.value?.trim();
  const password = el('regPassword')?.value;
  if(!username||!email||!password){ showMessage('Please fill all fields'); return }
  try{
    const res = await fetch(`${API}/auth/register`,{
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({username,email,password})
    });
    const data = await res.json();
    showMessage(data.message || 'Registered');
    if(res.ok) setTimeout(()=> location.href='login.html',800);
  }catch(err){ showMessage('Network error') }
}

async function login(){
  const email = el('loginEmail')?.value?.trim();
  const password = el('loginPassword')?.value;
  if(!email||!password){ showMessage('Please fill all fields'); return }
  try{
    const res = await fetch(`${API}/auth/login`,{
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email,password})
    });
    const data = await res.json();
    if(data.token){ localStorage.setItem('token', data.token); location.href='dashboard.html' }
    else showMessage(data.message||'Login failed');
  }catch(err){ showMessage('Network error') }
}

async function loadTasks(){
  const token = localStorage.getItem('token');
  if(!token) return location.href='login.html';
  try{
    const res = await fetch(`${API}/tasks`, {headers:{Authorization:'Bearer '+token}});
    if(!res.ok) { showMessage('Failed to load tasks'); return }
    const tasks = await res.json();
    const list = el('taskList'); if(!list) return;
    list.innerHTML = '';
    tasks.forEach(task=>{
      const card = document.createElement('div'); card.className='task';
      const title = document.createElement('h3'); title.innerText = task.title || 'Untitled';
      const desc = document.createElement('div'); desc.className='muted'; desc.innerText = task.description || '';
      const meta = document.createElement('div'); meta.className='meta'; meta.innerText = new Date(task.createdAt||Date.now()).toLocaleString();
      const actions = document.createElement('div'); actions.className='actions';
      const del = document.createElement('button'); del.className='btn small'; del.innerText='Delete'; del.onclick = ()=> deleteTask(task._id);
      actions.appendChild(del);
      card.appendChild(title); card.appendChild(desc); card.appendChild(meta); card.appendChild(actions);
      list.appendChild(card);
    })
  }catch(err){ showMessage('Network error while loading tasks') }
}

async function createTask(){
  const title = el('title')?.value?.trim();
  const description = el('description')?.value?.trim();
  if(!title){ showMessage('Please add a title'); return }
  try{
    const res = await fetch(`${API}/tasks`,{
      method:'POST', headers:{'Content-Type':'application/json', Authorization:'Bearer '+localStorage.getItem('token')},
      body:JSON.stringify({title,description})
    });
    if(res.ok){ el('title').value=''; el('description').value=''; loadTasks(); showMessage('Task added') }
    else showMessage('Failed to add task')
  }catch(err){ showMessage('Network error') }
}

async function deleteTask(id){
  if(!confirm('Delete this task?')) return;
  try{
    const res = await fetch(`${API}/tasks/${id}`,{method:'DELETE', headers:{Authorization:'Bearer '+localStorage.getItem('token')}});
    if(res.ok){ loadTasks(); showMessage('Task deleted') } else showMessage('Failed to delete')
  }catch(err){ showMessage('Network error') }
}

function logout(){ localStorage.removeItem('token'); location.href='login.html' }

if(window.location.pathname.includes('dashboard')) loadTasks();

// -------- Profile photo handling for index.html --------
function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
}

function loadProfile() {
  const img = document.getElementById('profileImage');
  if (!img) return;
  const stored = localStorage.getItem('profileImage');
  if (stored) img.src = stored;
  else {
    img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="100%" height="100%" fill="%237c3aed"/></svg>'
  }
}

function removeProfilePhoto(){
  localStorage.removeItem('profileImage');
  loadProfile();
}

document.addEventListener('DOMContentLoaded', ()=>{
  // load profile image on homepage
  loadProfile();
  const input = document.getElementById('photoInput');
  if (input) {
    input.addEventListener('change', async (e)=>{
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(ev){
        const data = ev.target.result;
        try{ localStorage.setItem('profileImage', data); document.getElementById('profileImage').src = data; showMessage('Photo saved') }catch(err){ showMessage('Could not save photo (storage limit)') }
      };
      reader.readAsDataURL(file);
    });
  }
});

