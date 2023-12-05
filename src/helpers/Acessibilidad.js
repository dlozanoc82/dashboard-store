

export const botonAcessibilidad = () => {
    document.addEventListener("userway:render_completed", function(event) {
	var userway = document.querySelector('div.uai');
    if (userway) {
        userway.classList.add('custom-icon-class');
    }
});
}