const form = document.getElementById("vehicleForm");
const list = document.getElementById("vehicleList");
let editId = null;

const apiUrl = "http://localhost:5000/api/vehicles";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    vehicleName: form.vehicleName.value,
    price: form.price.value,
    image: form.image.value,
    description: form.description.value,
    brand: form.brand.value,
  };

  if (editId) {
    await fetch(`${apiUrl}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    editId = null;
  } else {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  form.reset();
  loadVehicles();
});

async function loadVehicles() {
  const res = await fetch(apiUrl);
  const vehicles = await res.json();
  list.innerHTML = "";
  vehicles.forEach(v => {
    const card = document.createElement("div");
    card.className = "vehicle-card";
    card.innerHTML = `
      <h3>${v.vehicleName}</h3>
      <img src="${v.image}" width="150" />
      <p>Price: ₹${v.price}</p>
      <p>Brand: ${v.brand}</p>
      <p>${v.description}</p>
      <button onclick="editVehicle('${v._id}')">Edit</button>
      <button onclick="deleteVehicle('${v._id}')">Delete</button>
    `;
    list.appendChild(card);
  });
}

async function deleteVehicle(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  loadVehicles();
}

async function editVehicle(id) {
  const res = await fetch(`${apiUrl}/${id}`);
  const v = await res.json();
  form.vehicleName.value = v.vehicleName;
  form.price.value = v.price;
  form.image.value = v.image;
  form.description.value = v.description;
  form.brand.value = v.brand;
  editId = id;
}

loadVehicles();
