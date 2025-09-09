let inventory = [];

function renderInventory() {
  const tbody = document.getElementById("inventoryBody");
  tbody.innerHTML = "";

  inventory.forEach((item, index) => {
    const row = `<tr>
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.sku}</td>
      <td>${item.qty}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editItem(${index})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteItem(${index})">Delete</button>
      </td>
    </tr>`;
    tbody.insertAdjacentHTML("beforeend", row);
  });
}

function openAddItemModal() {
  document.getElementById("itemModalLabel").innerText = "Add Item";
  document.getElementById("itemForm").reset();
  document.getElementById("editIndex").value = "";
}

function saveItem(event) {
  event.preventDefault();

  const name = document.getElementById("itemName").value;
  const sku = document.getElementById("itemSKU").value;
  const qty = parseInt(document.getElementById("itemQty").value);
  const price = parseFloat(document.getElementById("itemPrice").value);
  const index = document.getElementById("editIndex").value;

  const newItem = { name, sku, qty, price };

  if (index === "") {
    inventory.push(newItem);
  } else {
    inventory[parseInt(index)] = newItem;
  }

  renderInventory();
  const modal = bootstrap.Modal.getInstance(document.getElementById("itemModal"));
  modal.hide();
}

function editItem(index) {
  const item = inventory[index];

  document.getElementById("itemModalLabel").innerText = "Edit Item";
  document.getElementById("itemName").value = item.name;
  document.getElementById("itemSKU").value = item.sku;
  document.getElementById("itemQty").value = item.qty;
  document.getElementById("itemPrice").value = item.price;
  document.getElementById("editIndex").value = index;

  const modal = new bootstrap.Modal(document.getElementById("itemModal"));
  modal.show();
}

function deleteItem(index) {
  if (confirm("Are you sure you want to delete this item?")) {
    inventory.splice(index, 1);
    renderInventory();
  }
}
