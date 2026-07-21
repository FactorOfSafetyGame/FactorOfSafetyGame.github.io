/* ==========================================================================
   Factor of Safety — front-end behavior
   Image gallery lightbox: click a thumbnail to expand, step through images
   with the side arrows (or Left/Right keys), click outside (or Escape) to close.
   ========================================================================== */
(function () {
	"use strict";

	var lightbox = document.getElementById("lightbox");
	if (!lightbox) return;

	var lightboxImg = lightbox.querySelector(".lightbox__img");
	var thumbs = Array.prototype.slice.call(document.querySelectorAll(".gallery__item"));
	var currentIndex = -1;
	var lastFocused = null;

	// Show the image at a given gallery index (wraps around both ends).
	function showImage(index) {
		if (!thumbs.length) return;
		currentIndex = (index + thumbs.length) % thumbs.length;
		var img = thumbs[currentIndex].querySelector("img");
		if (!img) return;
		// Prefer a full-res source if provided, else the thumbnail src.
		lightboxImg.src = thumbs[currentIndex].getAttribute("data-full") || img.src;
		lightboxImg.alt = img.alt || "";
	}

	function openLightbox(index) {
		showImage(index);
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

	function isOpen() {
		return lightbox.classList.contains("is-open");
	}

	// Open when a gallery thumbnail is clicked.
	thumbs.forEach(function (btn, i) {
		btn.addEventListener("click", function () {
			lastFocused = btn;
			openLightbox(i);
		});
	});

	// Clicks inside the lightbox: navigate, close, or ignore (image itself).
	lightbox.addEventListener("click", function (e) {
		if (e.target.closest("[data-prev]")) {
			showImage(currentIndex - 1);
		} else if (e.target.closest("[data-next]")) {
			showImage(currentIndex + 1);
		} else if (e.target === lightbox || e.target.hasAttribute("data-close")) {
			// Backdrop or close button — but not the image or arrows.
			closeLightbox();
		}
	});

	// Keyboard: Escape closes, arrows step through.
	document.addEventListener("keydown", function (e) {
		if (!isOpen()) return;
		if (e.key === "Escape") {
			closeLightbox();
		} else if (e.key === "ArrowLeft") {
			showImage(currentIndex - 1);
		} else if (e.key === "ArrowRight") {
			showImage(currentIndex + 1);
		}
	});
})();
