const rooms=[
{id:"A",name:"Room A",capacity:4,location:"1st Floor"},
{id:"B",name:"Room B",capacity:6,location:"2nd Floor"},
{id:"C",name:"Room C",capacity:8,location:"Library Wing"}
];

const slots=[
"9:00-10:00",
"10:00-11:00",
"11:00-12:00",
"12:00-1:00",
"2:00-3:00"
];

let bookings=JSON.parse(localStorage.getItem("bookings"))||{};

let selectedRoom=null;
let selectedSlot=null;

const modal=document.getElementById("modal");
const modalText=document.getElementById("modal-text");

function save(){
localStorage.setItem("bookings",JSON.stringify(bookings));
}

function render(){

const container=document.getElementById("rooms-container");
container.innerHTML="";

rooms.forEach(room=>{

const roomDiv=document.createElement("div");
roomDiv.className="room";

roomDiv.innerHTML=`
<h2> ${room.name}</h2>
<div class="room-info">Capacity: ${room.capacity} | ${room.location}</div>
<div class="slots"></div>
`;

const slotContainer=roomDiv.querySelector(".slots");

slots.forEach(slot=>{

const el=document.createElement("button");
el.className="slot";

const key=`${room.id}_${slot}`;

el.textContent=slot;

if(bookings[key]){
el.classList.add("booked");
}else{
el.classList.add("available");

el.onclick=()=>{
selectedRoom=room.id;
selectedSlot=slot;
modalText.innerText=`Book ${room.name} for ${slot}?`;
modal.classList.remove("hidden");
};
}

slotContainer.appendChild(el);

});

container.appendChild(roomDiv);

});

}

document.getElementById("confirm-book").onclick=()=>{

const key=`${selectedRoom}_${selectedSlot}`;

bookings[key]=true;

save();

modal.classList.add("hidden");

showToast("Booking confirmed!");

render();

};

document.getElementById("cancel-book").onclick=()=>{
modal.classList.add("hidden");
};

function showToast(msg){

const toast=document.getElementById("toast");

toast.innerText=msg;

toast.classList.add("show");

setTimeout(()=>toast.classList.remove("show"),2500);

}

document.getElementById("reset").onclick=()=>{

if(confirm("Clear all bookings?")){
localStorage.removeItem("bookings");
bookings={};
render();
}

};


const themeBtn = document.getElementById("toggle-theme");

themeBtn.onclick = () => {

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
themeBtn.innerText="Light Mode";
}else{
themeBtn.innerText="Dark Mode";
}

};


document.addEventListener("mousemove", (e) => {

document.querySelectorAll(".room").forEach(card => {

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const centerX = rect.width / 2;
const centerY = rect.height / 2;

const rotateX = -(y - centerY) / 15;
const rotateY = (x - centerX) / 15;

card.style.transform =
`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

});

});

document.querySelectorAll(".room").forEach(card => {

card.addEventListener("mouseleave", () => {
card.style.transform = "rotateX(0) rotateY(0)";
});

});

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e)=>{

glow.style.left = e.clientX + "px";
glow.style.top = e.clientY + "px";

});

render();