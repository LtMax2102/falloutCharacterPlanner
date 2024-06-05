let current_level = 1;
let unused_points = 21;

let strength = 1;
const strength_perks = document.querySelectorAll("#strength .perk");
const strength_holder = document.getElementById("strength-level");

let perception = 1;
const perception_perks = document.querySelectorAll("#perception .perk");
const perception_holder = document.getElementById("perception-level");

let endurance = 1;
const endurance_perks = document.querySelectorAll("#endurance .perk");
const endurance_holder = document.getElementById("endurance-level");

let charisma = 1;

const charisma_holder = document.getElementById("charisma-level");

let intelligence = 1;

const intelligence_holder = document.getElementById("intelligence-level");

let agility = 1;

const agility_holder = document.getElementById("agility-level");

let luck = 1;

const luck_holder = document.getElementById("luck-level");

window.onload = () => {
    update_special();
    disable_perk(strength_perks);
    disable_perk(perception_perks);
    disable_perk(endurance_perks);

    document.getElementById("current_level").textContent = "Current Level: " + current_level;
    document.getElementById("unused-points").innerHTML = unused_points;
}

const enable_perk = (perk) => {
    if (perk.length == undefined) {
        if (perk == strength_perks[0]) return;

        const img = perk.querySelector("img");
        const buttons = perk.querySelector(".perk-counter-holder");

        img.style.opacity = "1";
        buttons.style.opacity = "1";

        buttons.querySelectorAll("button").forEach(b => {
            b.disabled = false;
        })
    }
    else {
        perk.forEach(p => {
            if (p == perk[0]) return;

            const img = p.querySelector("img");
            const buttons = p.querySelector(".perk-counter-holder");
    
            img.style.opacity = "0.7";
            buttons.style.opacity = "0.7";
    
            buttons.querySelectorAll("button").forEach(b => {
                b.disabled = true;
            })
        })
    }
}

const disable_perk = (perk) => {
    if (perk.length == undefined) {
        if (perk == strength_perks[0]) return;

        const img = perk.querySelector("img");
        const buttons = perk.querySelector(".perk-counter-holder");

        img.style.opacity = "0.7";
        buttons.style.opacity = "0.7";

        buttons.querySelectorAll("button").forEach(b => {
            b.disabled = true;
        })
    }
    else {
        perk.forEach(p => {
            if (p == perk[0]) return;

            const img = p.querySelector("img");
            const buttons = p.querySelector(".perk-counter-holder");
    
            img.style.opacity = "0.7";
            buttons.style.opacity = "0.7";
    
            buttons.querySelectorAll("button").forEach(b => {
                b.disabled = true;
            })
        })
    }
}

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
            description.style.top = `${spaceBottom  + spaceBottom + 5}px`; // Move up if going off bottom
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

    const parent = img.parentElement;
    const button_container = img.previousElementSibling;

    const amount_of_ranks = parent.getElementsByClassName("rank-desc").length;

    let counter = parent.getElementsByClassName("counter")[0];
    let count = 0;


    if (counter) {
        counter.textContent = count + "/" + amount_of_ranks;
    }
    
    if (button_container) {
        const [button_minus, button_add] = button_container.querySelectorAll("button");
        
        button_add.addEventListener("click", () => {
            if (count != amount_of_ranks) count++;
            counter.textContent = count + "/" + amount_of_ranks;
        })

        button_minus.addEventListener("click", () => {
            if (count != 0) count--;
            counter.textContent = count + "/" + amount_of_ranks;
        })
    } 

});


const update_special = () => {
    strength_holder.textContent     = strength;
    perception_holder.textContent   = perception;
    endurance_holder.textContent    = endurance;
    charisma_holder.textContent     = charisma;
    intelligence_holder.textContent  = intelligence;
    agility_holder.textContent      = agility;
    luck_holder.textContent         = luck;
    document.getElementById("unused-points").textContent = unused_points;
}

const level_up = () => {
    current_level += 1;
    unused_points += 1;
    document.getElementById("current_level").textContent = "Current Level: " + current_level;
    document.getElementById("unused-points").textContent = unused_points;
    console.log(current_level);
}

const level_down = () => {
    if (current_level <= 1) return;
    current_level -= 1;
    unused_points -= 1;
    document.getElementById("current_level").textContent = "Current Level: " + current_level;
    document.getElementById("unused-points").textContent = unused_points;
    console.log(current_level);
}

const increase_special_stat = (stat) => {
    switch (stat) {
        case "strength":
            if (strength >= 10 || unused_points <= 0) break;
            enable_perk(strength_perks[strength]);
            strength++;
            unused_points--;
            break;
        case "perception":
            if (perception >= 10 || unused_points <= 0) break;
            enable_perk(perception_perks[perception]);
            perception++;
            unused_points--;
            break;
        case "endurance":
            if (endurance >= 10 || unused_points <= 0) break;
            enable_perk(endurance_perks[endurance]);
            endurance++;
            unused_points--;
            break;
        case "charisma":
            if (charisma >= 10 || unused_points <= 0) break;
            enable_perk(charisma_perks[charisma]);
            charisma++;
            unused_points--;
            break;
        case "intelligence":
            if (intelligence >= 10 || unused_points <= 0) break;
            enable_perk(intelligence_perks[intelligence]);
            intelligence++;
            unused_points--;
            break;
        case "agility":
            if (agility >= 10 || unused_points <= 0) break;
            enable_perk(agility_perks[agility]);
            agility++;
            unused_points--;
            break;
        case "luck":
            if (luck >= 10 || unused_points <= 0) break;
            enable_perk(luck_perks[luck]);
            luck++;
            unused_points--;
            break;
        default:
            break;
    }

    update_special();
}

const decrease_special_stat = (stat) => {
    switch (stat) {
        case "strength":
            if (strength <= 1) break;
            strength--;
            disable_perk(strength_perks[strength]);
            unused_points++;
            break;
        case "perception":
            if (perception <= 1) break;
            perception--;
            disable_perk(perception_perks[perception]);
            unused_points++;
            break;
        case "endurance":
            if (endurance <= 1) break;
            endurance--;
            disable_perk(endurance_perks[endurance]);
            unused_points++;
            break;
        case "charisma":
            if (charisma <= 1) break;
            charisma--;
            disable_perk(charisma_perks[charisma]);
            unused_points++;
            break;
        case "intelligence":
            if (intelligence <= 1) break;
            intelligence--;
            disable_perk(intelligence_perks[intelligence]);
            unused_points++;
            break;
        case "agility":
            if (agility <= 1) break;
            agility--;
            disable_perk(agility_perks[agility]);
            unused_points++;
            break;
        case "luck":
            if (luck <= 1) break;
            luck--;
            disable_perk(luck_perks[luck]);
            unused_points++;
            break;
        default:
            break;
    }

    update_special();
}