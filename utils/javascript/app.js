// Changing the default cursor
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.setAttribute(
    "style",
    `top: ${e.pageY}px; left: ${e.pageX}px; transform: translate(-50%, -50%);`
  );
});

document.addEventListener("drag", (e) => {
  cursor.setAttribute(
    "style",
    `top: ${e.pageY}px; left: ${e.pageX}px; transform: translate(-50%, -50%);`
  );
});
