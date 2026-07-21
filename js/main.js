/* ==========================================================================
   Factor of Safety — front-end behavior
   Image gallery lightbox: click a thumbnail to expand, click outside
   (or press Escape) to close.
   ========================================================================== */
(function () {
	"use strict";

	var lightbox = document.getElementById("lightbox");
	if (!lightbox) return;

	var lightboxImg = lightbox.querySelector(".lightbox__img");
	var lastFocused = null;

	function openLightbox(src, alt) {
		lightboxImg.src = src;
		lightboxImg.alt = alt || "";
		lightbox.classList.add("is-open");
		lightbox.setAttribute("aria-hidden", "false");
		document.body.classList.add("no-scroll");
	}

	function closeLightbox() {
		lightbox.classList.remove("is-open");
		lightbox.setAttribute("aria-hidden", "true");
		document.body.classList.remove("no-scroll");
		lightboxImg.src = "";
		if (lastFocused && typeof lastFocused.focus === "function") {
			lastFocused.focus();
		}
	}

	// Open when any gallery thumbnail is clicked.
	var thumbs = document.querySelectorAll(".gallery__item");
	Array.prototype.forEach.call(thumbs, function (btn) {
		btn.addEventListener("click", function () {
			var img = btn.querySelector("img");
			if (!img) return;
			lastFocused = btn;
			// Prefer a full-res source if provided, else the thumbnail src.
			openLightbox(btn.getAttribute("data-full") || img.src, img.alt);
		});
	});

	// Close when clicking the backdrop (but not the image itself) or the button.
	lightbox.addEventListener("click", function (e) {
		if (e.target === lightbox || e.target.hasAttribute("data-close")) {
			closeLightbox();
		}
	});

	// Close on Escape.
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
			closeLightbox();
		}
	});
})();
