const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const sliderBottons = document.querySelectorAll(
    ".slider-wrapper .slider-button"
  );
  const sliderScrollbar = document.querySelector(
    ".container .silder-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;

    // update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const maxThumbPosition =
        sliderScrollbar.getBoundingClientRect().width -
        scrollbarThumb.offsetWidth;

      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    // remove event listeners for drag interaction
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  //slide images according to the slide button clicks
  sliderBottons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slider" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  const handleSliderButtons = () => {
    sliderBottons[0].style.display =
      imageList.scrollLeft <= 0 ? "none" : "block";
    sliderBottons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
  };

  // update scrollbar thumb position based on image scroll
  const updateScrollThunbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  imageList.addEventListener("scroll", () => {
    handleSliderButtons();
    updateScrollThunbPosition();
  });
};

window.addEventListener("load", initSlider);
