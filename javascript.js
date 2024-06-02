let current_level = 1;

let strength = 1;
let perception = 1;
let endurance = 1;
let charisma = 1;
let inteligence = 1;
let agility = 1;
let luck = 1;

document.querySelectorAll('.perk img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        const description = img.nextElementSibling;
        description.style.display = 'flex';

        // Reset to initial position before calculation
        description.style.top = '-100px';
        description.style.left = '-250px';

        const rect = description.getBoundingClientRect();
        
        // Calculate available space on each side
        const spaceTop = rect.top;
        const spaceBottom = window.innerHeight - rect.bottom;
        const spaceLeft = rect.left;
        const spaceRight = window.innerWidth - rect.right;

        // console.log("Top " + spaceTop);
        // console.log("Bottom " + spaceBottom);
        // console.log("Left " + spaceLeft);
        // console.log("Right " + spaceRight);

        // Adjust position if going off the screen
        if (spaceBottom < 0) {
            description.style.top = `${spaceBottom  + spaceBottom}px`; // Move up if going off bottom
        }

        if (spaceRight < 0) {
            description.style.left = `${rect.left + spaceRight}px`; // Move left if going off right
        }

        if (spaceTop < 0) {
            description.style.top = '0px'; // Move down if going off top
        }

        if (spaceLeft < 0) {
            description.style.left = '0px'; // Move right if going off left
        }

        // console.log("NEW " + description.style.top);
    });

    img.addEventListener('mouseleave', () => {
        const description = img.nextElementSibling;
        description.style.display = 'none';
        description.style.top = '-100px'; // reset to initial position
        description.style.left = '-250px'; // reset to initial position
    });
});



const level_up = () => {
    current_level += 1;
    console.log(current_level);
}

const level_down = () => {
    current_level -= 1;
    console.log(current_level);
}