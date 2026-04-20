const TOTAL_PEOPLE = 40;

const boardEl = document.getElementById("board");
const secretPersonEl = document.getElementById("secret-person");
const pickRandomBtn = document.getElementById("pick-random-btn");
const resetMarksBtn = document.getElementById("reset-marks-btn");
let audioContext;

const configuredPeople = {
  1: {
    label: "אדווה",
    image:  "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-771c6bea-23c4-42ed-8798-a03c3452a844.png",
  },
  2: {
    label: "נופר",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-2aa91576-5c47-44e6-ac88-3b22193871fa.png",
  },
  3: {
    label: "רניאל",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-d019d003-6bc0-4895-bdd1-e467262c0520.png",
  },
  4: {
    label: "גלי",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-58ab27c1-1107-489f-8996-0ed3cff695d3.png",
  },
  5: {
    label: "מאי",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-bb2b86a1-e70b-4163-9cb8-8b01dea4574e.png",
  },
  6: {
    label: "חן הלל",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-2abe41bb-0ab0-4099-85b0-dd4becfc6f3d.png",
  },
  7: {
    label: "נועה",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-845d801a-528a-43f6-8191-b8dfc97d9e59.png",
  },
  8: {
    label: "אולסיה",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-7bc66773-a6eb-4b67-bf2e-6a23eab8fca0.png",
  },
  9: {
    label: "פרלי",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-af169b06-2b28-4842-a1e8-3c7fb3c1912e.png",
  },
  10: {
    label: "אמילי",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-71861e7a-7443-4bb5-9b11-924d0d57eb49.png",
  },
  11: {
    label: "אורי",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-46084e5d-e3c1-4d68-b734-7a989549eaab.png",
  },
  12: {
    label: "ליהיא",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_WhatsApp_Image_2026-04-19_at_22.36.24-ac766463-a59f-4344-8ee8-728c0da28248.png",
  },
  21: {
    label: "לרה",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-ae6e834b-41d2-4891-8b9f-70fd7b9c0f54.png",
  },
  13: {
    label: "לידור",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-13863ad5-3a57-4c58-8764-5a56185d45a5.png",
  },
  22: {
    label: "מאיר",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-2b0b9e92-f4f5-4282-a168-a33c58cd480c.png",
  },
  23: {
    label: "עמית",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-c84e4fbf-44c2-4260-a460-573ddd06bfd4.png",
  },
  24: {
    label: "חן פילץ",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-cf7d306d-8f73-4bcf-9d8f-3781345068b4.png",
  },
  25: {
    label: "אופיר",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-bdb32f2c-700e-40ab-95ac-f49ee5abf7d0.png",
  },
  26: {
    label: "יונה",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-78804762-c9e6-44b3-aa33-ea0bc79137fe.png",
  },
  27: {
    label: "נדב",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-d6b0fac2-c432-4ec7-a360-63768e3361b2.png",
  },
  28: {
    label: "אילור",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-136ea643-7bd4-4fb2-aec1-e5d954130338.png",
  },
  29: {
    label: "רואי",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-0369707f-b252-413f-912c-cce04fea1c3c.png",
  },
  30: {
    label: "דניאל",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-bf7e3288-4fb5-4f2e-8f2c-961eb992a19b.png",
  },
  31: {
    label: "לנה",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-7457547b-1f97-4ecb-9e2e-43ad868dce08.png",
  },
  32: {
    label: "אופק",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-6845905b-521e-41e5-9edf-88288e24fab0.png",
  },
  33: {
    label: "אורין",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-abd8d433-2f0a-41a1-9671-284fdc60ad6b.png",
  },
  34: {
    label: "נינה",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-a9cf1163-f837-4904-b358-6f5106e776c7.png",
  },
  35: {
    label: "נחום",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_WhatsApp_Image_2026-04-19_at_23.35.46-db49f36f-d8c7-4665-bc0b-b85b98d1a6b5.png",
  },
  36: {
    label: "מאיר מחנך",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-a68d8638-576a-4f53-801e-d6a406631bd6.png",
  },
  37: {
    label: "נויה",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-de4b2eb7-4e59-4a25-a39b-9ad698c1024e.png",
  },
  38: {
    label: "ארטיום",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-444b71dc-0ce0-4b3d-b062-68c83635c85f.png",
  },
  39: {
    label: "גרישה",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-b1c89ebe-db10-43eb-8f9c-bfaebd3ea100.png",
  },
  14: {
    label: "שליו",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-8fb8a335-f5a2-40b3-9fdb-2a39e407f0a1.png",
  },
  15: {
    label: "תמיר",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-7054b99d-719d-41c1-9dbb-0e7045e1f356.png",
  },
  16: {
    label: "יעל",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-38bf4fc4-831a-4388-8fc1-3ccd5648adb6.png",
  },
  17: {
    label: "שירה",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-6afa80e6-4d82-41a8-94f0-3649d77adb68.png",
  },
  18: {
    label: "יאן",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-c60a2560-b229-4a6d-bc68-fe025af8d074.png",
  },
  19: {
    label: "רונה",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-3f8fb141-1614-4385-86e1-43041e967e58.png",
  },
  20: {
    label: "עילאי",
    image:
      "file:///C:/Users/%D7%99%D7%A0%D7%90%D7%99%20%D7%A7%D7%94%D7%99%D7%9E%D7%A7%D7%A8/.cursor/projects/c-Users-Projects-guess-who-game/assets/c__Users_____________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-48e0420e-40fd-42f4-a1da-2a29f74ca421.png",
  },
  40: {
    label: "דנדול",
    image:
  },
};

const people = Array.from({ length: TOTAL_PEOPLE }, (_, i) => ({
  id: i + 1,
  label: configuredPeople[i + 1]?.label ?? `אדם ${i + 1}`,
  image: configuredPeople[i + 1]?.image ?? null,
}));

function playClickSound(type = "card") {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  if (!audioContext) {
    audioContext = new AudioCtx();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  const now = audioContext.currentTime;
  const frequency = type === "random" ? 560 : 320;
  const endFrequency = type === "random" ? 760 : 240;

  osc.type = "triangle";
  osc.frequency.setValueAtTime(frequency, now);
  osc.frequency.exponentialRampToValueAtTime(endFrequency, now + 0.08);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.2, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + 0.12);
}

function createBoard() {
  boardEl.innerHTML = "";

  people.forEach((person) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.setAttribute("aria-label", person.label);
    card.dataset.id = String(person.id);
    card.innerHTML = person.image
      ? `
      <img class="card-image" src="${person.image}" alt="${person.label}" />
      <span class="card-name">${person.label}</span>
    `
      : `
      <span class="card-number">${person.id}</span>
      <span class="card-name">${person.label}</span>
    `;

    card.addEventListener("click", () => {
      card.classList.toggle("marked");
      playClickSound("card");
    });

    if (person.image) {
      const imageEl = card.querySelector(".card-image");
      imageEl.addEventListener("error", () => {
        card.innerHTML = `
          <span class="card-number">${person.id}</span>
          <span class="card-name">${person.label}</span>
        `;
      });
    }

    boardEl.appendChild(card);
  });
}

function pickRandomSecretPerson() {
  const randomIndex = Math.floor(Math.random() * people.length);
  const picked = people[randomIndex];
  secretPersonEl.textContent = `${picked.label} (#${picked.id})`;
  playClickSound("random");
}

function resetAllMarks() {
  const markedCards = boardEl.querySelectorAll(".card.marked");
  markedCards.forEach((card) => card.classList.remove("marked"));
  playClickSound("random");
}

pickRandomBtn.addEventListener("click", pickRandomSecretPerson);
resetMarksBtn.addEventListener("click", resetAllMarks);

createBoard();
