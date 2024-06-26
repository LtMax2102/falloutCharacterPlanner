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
const charisma_perks = document.querySelectorAll("#charisma .perk");
const charisma_holder = document.getElementById("charisma-level");

let intelligence = 1;
const intelligence_perks = document.querySelectorAll("#intelligence .perk");
const intelligence_holder = document.getElementById("intelligence-level");

let agility = 1;
const agility_perks = document.querySelectorAll("#agility .perk");
const agility_holder = document.getElementById("agility-level");

let luck = 1;
const luck_perks = document.querySelectorAll("#luck .perk");
const luck_holder = document.getElementById("luck-level");

window.onload = () => {
    update_special();
    disable_perk(strength_perks);
    disable_perk(perception_perks);
    disable_perk(endurance_perks);
    disable_perk(charisma_perks);
    disable_perk(intelligence_perks);    
    disable_perk(agility_perks);
    disable_perk(luck_perks);

    document.getElementById("current_level").textContent = "Current Level: " + current_level;
    document.getElementById("unused-points").innerHTML = unused_points;
}

const enable_perk = (perk) => {
    if (perk.length == undefined) {
        if (perk == strength_perks[0]) return;
        console.log(perk);
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
            if (p == perk[0] || p == perk[1]) return;

            const img = p.querySelector("img");
            const buttons = p.querySelector(".perk-counter-holder");
    
            img.style.opacity = "1";
            buttons.style.opacity = "1";
    
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
            if (p == perk[0] || p == perk[1]) return;

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
    let descriptions = img.nextElementSibling.querySelectorAll(".rank-desc");
    let count = 0;

    if (counter) {
        counter.textContent = count + "/" + amount_of_ranks;
    }
    
    if (button_container) {
        const [button_minus, button_add] = button_container.querySelectorAll("button");
        
        button_add.addEventListener("click", () => {
            if (count != amount_of_ranks && unused_points > 0) { 
                count++;
                unused_points--; 
                descriptions[count - 1].id = "active";
                counter.textContent = count + "/" + amount_of_ranks;
                update_special();
            }
        })

        button_minus.addEventListener("click", () => {
            if (count != 0) {
                count--;
                unused_points++;
                descriptions[count].removeAttribute("id");
                counter.textContent = count + "/" + amount_of_ranks;
                update_special();
            }
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
            strength++;
            unused_points--;
            enable_perk(strength_perks[strength]);
            break;
        case "perception":
            if (perception >= 10 || unused_points <= 0) break;
            perception++;
            unused_points--;
            enable_perk(perception_perks[perception]);
            break;
        case "endurance":
            if (endurance >= 10 || unused_points <= 0) break;
            endurance++;
            unused_points--;
            enable_perk(endurance_perks[endurance]);
            break;
        case "charisma":
            if (charisma >= 10 || unused_points <= 0) break;
            charisma++;
            unused_points--;
            enable_perk(charisma_perks[charisma]);
            break;
        case "intelligence":
            if (intelligence >= 10 || unused_points <= 0) break;
            intelligence++;
            unused_points--;
            enable_perk(intelligence_perks[intelligence]);
            break;
        case "agility":
            if (agility >= 10 || unused_points <= 0) break;
            agility++;
            unused_points--;
            enable_perk(agility_perks[agility]);
            break;
        case "luck":
            if (luck >= 10 || unused_points <= 0) break;
            luck++;
            unused_points--;
            enable_perk(luck_perks[luck]);
            break;
        default:
            break;
    }

    update_special();
}

const decrease_special_stat = (stat) => {
    let empty = true;
    switch (stat) {
        case "strength":
            if (strength <= 1) break;
            strength_perks[strength].querySelectorAll(".rank-desc").forEach(desc => {
                if (desc.id) {
                    alert("Current special stat level has points in, remove these before attempting to decrease the special stat");
                    empty = false;
                }
            })

            if (empty) {
                disable_perk(strength_perks[strength]);
                strength--;
                unused_points++;
            }
            break;
        case "perception":
            if (perception <= 1) break;
            perception_perks[perception].querySelectorAll("rank-desc").forEach(desc => {
                if (desc.id) {
                    alert("Current special stat level has points in, remove these before attempting to decrease the special stat");
                    empty = false;
                }
            })

            if (empty) {
                disable_perk(perception_perks[perception]);
                perception--;
                unused_points++;
            }
            break;
        case "endurance":
            if (endurance <= 1) break;
            endurance_perks[endurance].querySelectorAll(".rank-desc").forEach(desc => {
                if (desc.id) {
                    alert("Current special stat level has points in, remove these before attempting to decrease the special stat");
                    empty = false;
                }
            })
            
            if (empty) {
                disable_perk(endurance_perks[endurance]);
                endurance--;
                unused_points++;
            }
            break;
        case "charisma":
            if (charisma <= 1) break;
            charisma_perks[charisma].querySelectorAll(".rank-desc").forEach(desc => {
                if (desc.id) {
                    alert("Current special stat level has points in, remove these before attempting to decrease the special stat");
                    empty = false;
                }
            })
            
            if (empty) {
                disable_perk(charisma_perks[charisma]);
                charisma--;
                unused_points++;
            }
            break;
        case "intelligence":
            if (intelligence <= 1) break;
            intelligence_perks[intelligence].querySelectorAll(".rank-desc").forEach(desc => {
                if (desc.id) {
                    alert("Current special stat level has points in, remove these before attempting to decrease the special stat");
                    empty = false;
                }
            })
            
            if (empty) {
                disable_perk(intelligence_perks[intelligence]);
                intelligence--;
                unused_points++;
            }
            break;
        case "agility":
            if (agility <= 1) break;
            agility_perks[agility].querySelectorAll(".rank-desc").forEach(desc => {
                if (desc.id) {
                    alert("Current special stat level has points in, remove these before attempting to decrease the special stat");
                    empty = false;
                }
            })
            
            if (empty) {
                disable_perk(agility_perks[agility]);
                agility--;
                unused_points++;
            }
            break;
        case "luck":
            if (luck <= 1) break;
            luck_perks[luck].querySelectorAll(".rank-desc").forEach(desc => {
                if (desc.id) {
                    alert("Current special stat level has points in, remove these before attempting to decrease the special stat");
                    empty = false;
                }
            })
            
            if (empty) {
                disable_perk(luck_perks[luck]);
                luck--;
                unused_points++;
            }
            break;
        default:
            break;
    }

    update_special();
}