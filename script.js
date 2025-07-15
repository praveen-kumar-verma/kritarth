let greenLEDState = [false, false, false, false, false];
let orangeLEDState = [false, false, false, false, false];

let imSwitchState = false;
allButtonStatus = {};

const buttons = document.querySelectorAll(".push-button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("clicked"));
    button.classList.add("clicked");
    // document
    //   .querySelectorAll(".led")
    //   .forEach((led) => led.classList.remove("led-on"));
    // const ledId = button.getAttribute("data-led");
    // if (ledId) {
    //   return;
    // }
    // console.log(ledId);
    // document.getElementById(ledId).classList.add("led-on");
  });
});

function toggleLED(index) {
  if (index == 5) {
    greenLEDState[index - 1] = !greenLEDState[index - 1];
    if (allButtonStatus.hasOwnProperty(index)) {
      allButtonStatus[index] = greenLEDState[index - 1];
    } else {
      allButtonStatus[index] = true; 
    }
    updateLEDs();
  } else {
    if (greenLEDState[4] == true) {
      greenLEDState[index - 1] = !greenLEDState[index - 1];
      updateLEDs();
    }
  }
}

function toggleLEDsqns(index) {
  if (greenLEDState[4] === true) {
    const conditions = [
      () => true,
      () => greenLEDState[0] === true,
      () => greenLEDState[0] === true && greenLEDState[1] === true,
      () =>
        greenLEDState[0] === true &&
        greenLEDState[1] === true &&
        greenLEDState[2] === true,
    ];

    if (conditions[index - 1]()) {

      greenLEDState[index - 1] = !greenLEDState[index - 1];
      if (allButtonStatus.hasOwnProperty(index)) {
        allButtonStatus[index] = greenLEDState[index - 1];
      } else {
        allButtonStatus[index] = true;
      }
      updateLEDs();
      updateSecondLevelText();
    }
    if (conditions[2]()) {
      updateMps();
    }
    if (conditions[3]()) {
      updateRru();
    }
  }
}

function updateSecondLevelText() {
  const leftDisplay = document.getElementById("leftDisplay");

  leftDisplay.innerHTML = `
            <div class="ldt d-flex justify-content-between pe-2 ps-2">
              <div>
                MSL(V)

              </div>
              <div>
                MSL(I)
              </div>
              <div>
                MSP(I)
              </div>

            </div>

            <div class="ldb d-flex justify-content-between pe-2 ps-2">
              <div>
              32V

              </div>
              <div>
                0
              </div>
              <div>
                0
              </div>
            </div>
`;
}

function updateMps() {
  const leftDisplay = document.getElementById("leftDisplay");

  leftDisplay.innerHTML = `
            <div class="ldt d-flex justify-content-between pe-2 ps-2">
              <div>
                MSL(V)

              </div>
              <div>
                MSL(I)
              </div>
              <div>
                MSP(I)
              </div>

            </div>

            <div class="ldb d-flex justify-content-between pe-2 ps-2">
              <div>
              32V

              </div>
              <div>
                0.6
              </div>
              <div>
                0
              </div>
            </div>
`;
}

function updateRru() {
  const leftDisplay = document.getElementById("leftDisplay");

  leftDisplay.innerHTML = `
            <div class="ldt d-flex justify-content-between pe-2 ps-2">
              <div>
                MSL(V)

              </div>
              <div>
                MSL(I)
              </div>
              <div>
                MSP(I)
              </div>

            </div>

            <div class="ldb d-flex justify-content-between pe-2 ps-2">
              <div>
              32V

              </div>
              <div>
                0.6
              </div>
              <div>
                2.2
              </div>
            </div>
`;
}

function toggleOrangeLED(index, fllButtonSqns) {
  if (
    greenLEDState[4] == true &&
    greenLEDState[0] == true &&
    greenLEDState[1] == true &&
    greenLEDState[2] == true &&
    greenLEDState[3] == true
  ) {
    if (index == 5) {
      orangeLEDState[index - 1] = !orangeLEDState[index - 1];
      if (allButtonStatus.hasOwnProperty(fllButtonSqns)) {
        allButtonStatus[fllButtonSqns] = orangeLEDState[index - 1];
      } else {
        allButtonStatus[fllButtonSqns] = true;
      }
      updateLEDs("emsafe");
    }
  }
}
function toggleOrangeLEDsqns(index, fllButtonSqns) {
  if (greenLEDState[4] === true && orangeLEDState[4] == true) {
    const conditions = [
      () =>
        greenLEDState[0] === true &&
        greenLEDState[1] === true &&
        greenLEDState[2] === true &&
        greenLEDState[3] === true &&
        greenLEDState[4] === true,
      () =>
        greenLEDState[0] === true &&
        greenLEDState[1] === true &&
        greenLEDState[2] === true &&
        greenLEDState[3] === true &&
        greenLEDState[4] === true &&
        orangeLEDState[0] === true,
      () =>
        greenLEDState[0] === true &&
        greenLEDState[1] === true &&
        greenLEDState[2] === true &&
        greenLEDState[3] === true &&
        greenLEDState[4] === true &&
        orangeLEDState[0] === true &&
        orangeLEDState[1] === true,
      () =>
        greenLEDState[0] === true &&
        greenLEDState[1] === true &&
        greenLEDState[2] === true &&
        greenLEDState[3] === true &&
        greenLEDState[4] === true &&
        orangeLEDState[0] === true &&
        orangeLEDState[1] === true &&
        orangeLEDState[2] === true,
    ];

    if (conditions[index - 1]()) {
      orangeLEDState[index - 1] = !orangeLEDState[index - 1];
      if (allButtonStatus.hasOwnProperty(fllButtonSqns)) {
        allButtonStatus[fllButtonSqns] = orangeLEDState[index - 1];
      } else {
        allButtonStatus[fllButtonSqns] = true;
      }
      updateLEDs();
      updateRru();
    }
  }
}

function updateLEDs(call) {
  for (let i = 0; i < 5; i++) {
    const led = document.getElementById(`led${i + 1}`);
    if (greenLEDState[i]) {
      led.classList.add("led-on");
      led.classList.remove("led-off");
    } else {
      led.classList.remove("led-on");
      led.classList.add("led-off");
    }
  }

  for (let i = 0; i < 5; i++) {
    const led = document.getElementById(`led${i + 6}`);
    if (orangeLEDState[i]) {
      led.classList.add("led-orange");
      led.classList.remove("led-off");
    } else {
      led.classList.remove("led-orange");
      led.classList.add("led-off");
    }
  }
  updateDisplayRghts(call);
}

function updateDisplayRghts(call) {
  const leftDisplay = document.getElementById("leftDisplay");
  const rightDisplay = document.getElementById("rightDisplay");

  if (call === "emsafe") {
    updateRru();
    return;
  }

  if (greenLEDState[4]) {
    // Check if IM switch is ON
    imSwitchState = true;
    leftDisplay.innerHTML = `
<div class="ldt d-flex justify-content-between pe-2 ps-2">
<div>
MSL(V)

</div>
<div>
MSL(I)
</div>
<div>
MSL(I)
</div>

</div>

<div class="ldb d-flex justify-content-between pe-2 ps-2">
<div>
0

</div>
<div>
0
</div>
<div>
0
</div>
</div>
`;
    rightDisplay.innerHTML = `
<div class="ldt">
Akash Launcher

</div>

<div class="ldb d-flex justify-content-between pe-2 ps-2">
<div> 
OPRN

</div>
<div> 
SLFCHK
</div>
</div>
`;
  } else {
    imSwitchState = false;
    leftDisplay.innerHTML = "";
    rightDisplay.innerHTML = "";
  }
}

const steps = {
  step1: {
    id: "step1",
    description: "Akash Launcher",
    options: ["OPRN", "SLFCHK"],
    next: null,
    prev: null,
  },
  step2_oprn: {
    id: "step2_oprn",
    description: "Akash Launcher",
    options: ["F1", "F2", "F3", "F4"],
    next: null,
    prev: "step1",
  },
  step2_slfchk: {
    id: "step2_slfchk",
    description: "Step 2 - SLFCHK",
    options: ["Check 1", "Check 2"],
    next: null,
    prev: "step1",
  },
  step3_prelaunch: {
    id: "step3_prelaunch",
    description: "PRELAUNCH CHECKOUT",
    options: ["M1", "M2", "M3"],
    next: null,
    prev: "step2_oprn",
  },
  step4_m1: {
    id: "step4_m1",
    description: "M1 CHKOUT",
    options: ["A1", "A2", "A3", "A4 >", "< A5", "A6", "A7", "A8"],
    currentPage: 1,
    optionsPerPage: 4,
    next: null,
    prev: "step3_prelaunch",
  },
  step4_m2: {
    id: "step4_m2",
    description: "M2 CHKOUT",
    options: ["A1", "A2", "A3", "A4 >", "< A5", "A6", "A7", "A8"],
    currentPage: 1,
    optionsPerPage: 4,
    next: null,
    prev: "step3_prelaunch",
  },
  step4_m3: {
    id: "step4_m3",
    description: "M3 CHKOUT",
    options: ["A1", "A2", "A3", "A4 >", "< A5", "A6", "A7", "A8"],
    currentPage: 1,
    optionsPerPage: 4,
    next: null,
    prev: "step3_prelaunch",
  },

  step5_m1_a1: {
    id: "step5_m1_a1",
    description: "M1 POWER ON",
    options: ["GO"],
    next: null,
    prev: "step4_m1",
  },
  step5_m1_a2: {
    id: "step5_m1_a2",
    description: "M1 POWER OFF",
    options: ["GO"],
    next: null,
    prev: "step4_m1",
  },
  step5_m1_a3: {
    id: "step5_m1_a3",
    description: "M1 HEALTH : GO",
    options: [],
    next: null,
    prev: "step4_m1",
  },
  step5_m1_a4: {
    id: "step5_m1_a4",
    description: "CGU CHECK : GO",
    options: [],
    next: null,
    prev: "step4_m1",
  },

  step5_m2_a1: {
    id: "step5_m2_a1",
    description: "M2 POWER ON",
    options: ["GO"],
    next: null,
    prev: "step4_m2",
  },
  step5_m2_a2: {
    id: "step5_m2_a2",
    description: "M2 POWER OFF",
    options: ["GO"],
    next: null,
    prev: "step4_m2",
  },
  step5_m2_a3: {
    id: "step5_m2_a3",
    description: "M2 HEALTH : GO",
    options: [],
    next: null,
    prev: "step4_m2",
  },
  step5_m2_a4: {
    id: "step5_m2_a4",
    description: "CGU CHECK : GO",
    options: [],
    next: null,
    prev: "step4_m2",
  },

  step5_m3_a1: {
    id: "step5_m3_a1",
    description: "M3 POWER ON",
    options: ["GO"],
    next: null,
    prev: "step4_m3",
  },
  step5_m3_a2: {
    id: "step5_m3_a2",
    description: "M3 POWER OFF",
    options: ["GO"],
    next: null,
    prev: "step4_m3",
  },
  step5_m3_a3: {
    id: "step5_m3_a3",
    description: "M3 HEALTH : GO",
    options: [],
    next: null,
    prev: "step4_m3",
  },
  step5_m3_a4: {
    id: "step5_a4",
    description: "CGU CHECK : GO",
    options: [],
    next: null,
    prev: "step4_m3",
  },
};

let currentStep = "step1";
let selectedButton = null;
let step4Next = null;
let isEscPressed = false;


function buttonFunction(button) {
  const keys = Object.keys(allButtonStatus);
  if (keys.length !== 10) return;

  const allTrue = keys.every(key => allButtonStatus[key] === true);
  if (!allTrue) return;

  switch (button) {
    case 1:
      if (currentStep === "step1") {
        selectedButton = "OPRN";
      }
      if (currentStep === "step2_oprn") {
        selectedButton = "F1";
      }
      if (currentStep === "step3_prelaunch") {
        selectedButton = "M1";
      }
      if (
        currentStep === "step4_m1" ||
        currentStep === "step4_m2" ||
        currentStep === "step4_m3"
      ) {
        selectedButton = "A1";
      }
      // turnonALLLight();

      break;
    case 2:
      if (currentStep === "step1") {
        selectedButton = "SLFCHK";
      }
      if (currentStep === "step2_oprn") {
        selectedButton = "F2";
      }
      if (currentStep === "step3_prelaunch") {
        selectedButton = "M2";
      }
      if (
        currentStep === "step4_m1" ||
        currentStep === "step4_m2" ||
        currentStep === "step4_m3"
      ) {
        selectedButton = "A2";
      }

      break;
    case 3:
      if (currentStep === "step2_oprn") {
        selectedButton = "F3";
      }
      if (currentStep === "step3_prelaunch") {
        selectedButton = "M3";
      }
      if (
        currentStep === "step4_m1" ||
        currentStep === "step4_m2" ||
        currentStep === "step4_m3"
      ) {
        selectedButton = "A3";
      }
      break;
    case 4:
      selectedButton = "F4";
      if (
        currentStep === "step4_m1" ||
        currentStep === "step4_m2" ||
        currentStep === "step4_m3"
      ) {
        selectedButton = "A4";
      }
      break;
    case "NEXT":
      selectedButton = "NEXT";

      break;
    case "PREV":
      selectedButton = "PREV";

      break;
    case "ENT":
      if (isEscPressed) {
        if (steps[currentStep].prev) {
          currentStep = steps[currentStep].prev;
        }
        isEscPressed = false;
      } else if (selectedButton === "NEXT") {
        const currentStepData = steps[currentStep];
        if (currentStep.includes("step4")) {
          if (
            currentStepData.currentPage * currentStepData.optionsPerPage <
            currentStepData.options.length
          ) {
            currentStepData.currentPage++;
            step4Next = "step4next";
          } else if (steps[currentStep].next) {
            currentStep = steps[currentStep].next;
            step4Next = null;
          }
        } else if (steps[currentStep].next) {
          currentStep = steps[currentStep].next;
        }
      } else if (selectedButton === "PREV") {
        const currentStepData = steps[currentStep];
        if (currentStep.includes("step4")) {
          if (currentStepData.currentPage > 1) {
            currentStepData.currentPage--;
          }
        } else {
        }
      } else {
        const currentStepData = steps[currentStep];
        if (currentStep === "step1") {
          if (selectedButton === "OPRN") {
            currentStep = "step2_oprn";
          } else if (selectedButton === "SLFCHK") {
            currentStep = "step2_slfchk";
          }
        } else if (currentStep === "step2_oprn" && selectedButton === "F1") {
          currentStep = "step3_prelaunch";
        } else if (currentStep === "step3_prelaunch") {
          if (selectedButton === "M1") {
            currentStep = "step4_m1";
          } else if (selectedButton === "M2") {
            currentStep = "step4_m2";
          } else if (selectedButton === "M3") {
            currentStep = "step4_m3";
          }
        } else if (
          currentStep.includes("step4") &&
          selectedButton.startsWith("A")
        ) {
          if (currentStep === "step4_m1") {
            if (step4Next === null) {
              if (selectedButton === "A1") {
                currentStep = "step5_m1_a1";
                steps["step5_m1_a1"].description = "M1 POWER ON";
                steps["step5_m1_a1"].options = ["GO"];
              } else if (selectedButton === "A2") {
                currentStep = "step5_m1_a2";
                steps["step5_m1_a2"].description = "M1 POWER OFF";
                steps["step5_m1_a2"].options = ["GO"];
              } else if (selectedButton === "A3") {
                currentStep = "step5_m1_a3";
                steps["step5_m1_a3"].description = "M1 HEALTH : GO";
                steps["step5_m1_a3"].options = [];
              } else if (selectedButton === "A4") {
                currentStep = "step5_m1_a4";
                steps["step5_m1_a4"].description = "CGU CHECK : GO";
                steps["step5_m1_a4"].options = [];
              }
            } else {
              if (selectedButton === "A1") {
                openModal("CGU Data check");
              } else if (selectedButton === "A2") {
                openModal("Actuator null data check");
              } else if (selectedButton === "A3") {
                openModal("Miscellaneous data check");
              } else if (selectedButton === "A4") {
                openModal("Sensor null check");
              }
            }
          } else if (currentStep === "step4_m2") {
            if (step4Next === null) {
              if (selectedButton === "A1") {
                currentStep = "step5_m2_a1";
                steps["step5_m2_a1"].description = "M2 POWER ON";
                steps["step5_m2_a1"].options = ["GO"];
              } else if (selectedButton === "A2") {
                currentStep = "step5_m2_a1";
                steps["step5_m2_a1"].description = "M2 POWER OFF";
                steps["step5_m2_a1"].options = ["GO"];
              } else if (selectedButton === "A3") {
                currentStep = "step5_m2_a3";
                steps["step5_m2_a3"].description = "M2 HEALTH : GO";
                steps["step5_m2_a3"].options = [];
              } else if (selectedButton === "A4") {
                currentStep = "step5_m2_a4";
                steps["step5_m2_a4"].description = "CGU CHECK : GO";
                steps["step5_m2_a4"].options = [];
              }
            } else {
              if (selectedButton === "A1") {
                openModal("CGU Data check");
              } else if (selectedButton === "A2") {
                openModal("Actuator null data check");
              } else if (selectedButton === "A3") {
                openModal("Miscellaneous data check");
              } else if (selectedButton === "A4") {
                openModal("Sensor null check");
              }
            }
          }

          else if (currentStep === "step4_m3") {
            if (step4Next === null) {
              if (selectedButton === "A1") {
                currentStep = "step5_m3_a1";
                steps["step5_m3_a1"].description = "M3 POWER ON";
                steps["step5_m3_a1"].options = ["GO"];
              } else if (selectedButton === "A2") {
                currentStep = "step5_m3_a1";
                steps["step5_m3_a1"].description = "M3 POWER OFF";
                steps["step5_m3_a1"].options = ["GO"];
              } else if (selectedButton === "A3") {
                currentStep = "step5_m3_a3";
                steps["step5_m3_a3"].description = "M3 HEALTH : GO";
                steps["step5_m3_a3"].options = [];
              } else if (selectedButton === "A4") {
                currentStep = "step5_m2_a4";
                steps["step5_m3_a4"].description = "CGU CHECK : GO";
                steps["step5_m3_a4"].options = [];
              }
            } else {
              if (selectedButton === "A1") {
                openModal("CGU Data check");
              } else if (selectedButton === "A2") {
                openModal("Actuator null data check");
              } else if (selectedButton === "A3") {
                openModal("Miscellaneous data check");
              } else if (selectedButton === "A4") {
                openModal("Sensor null check");
              }
            }
          }
        }
      
  }
  updateDisplayRght();
  break;
    case "ESC":
  isEscPressed = true;
  step4Next = null;
  break;
    case "ENT":
  if (isEscPressed) {
    if (steps[currentStep].prev) {
      currentStep = steps[currentStep].prev;
    }
    isEscPressed = false;
  }
  updateDisplayRght();
  break;
    case "RSET":
  currentStep = "step1";
  isEscPressed = false;
  selectedButton = null;

  updateDisplayRght();
  break;
    default:
  break;
}

for (let i = 0; i < 5; i++) {
  const led = document.getElementById(`led${i + 1}`);
  if (greenLEDState[i]) {
    led.classList.add("led-on");
    led.classList.remove("led-off");
  } else {
    led.classList.remove("led-on");
    led.classList.add("led-off");
  }
}

for (let i = 0; i < 5; i++) {
  const led = document.getElementById(`led${i + 6}`);
  if (orangeLEDState[i]) {
    led.classList.add("led-orange");
    led.classList.remove("led-off");
  } else {
    led.classList.remove("led-orange");
    led.classList.add("led-off");
  }
}


}

function updateDisplayRght() {
  const rightDisplay = document.getElementById("rightDisplay");
  if (!greenLEDState[4]) {
    rightDisplay.innerHTML = "";

    return;
  }

  const currentStepData = steps[currentStep];

  let displayedOptions = currentStepData.options;
  if (currentStep.includes("step4")) {
    const startIndex =
      (currentStepData.currentPage - 1) * currentStepData.optionsPerPage;
    displayedOptions = currentStepData.options.slice(
      startIndex,
      startIndex + currentStepData.optionsPerPage
    );
  }

  rightDisplay.innerHTML = `
        <div class="ldt">
            ${currentStepData.description}
        </div>
        <div class="ldb d-flex justify-content-between pe-2 ps-2">
            ${displayedOptions.map((option) => `<div>${option}</div>`).join("")}
        </div>
    `;
}

function openModal(message) {
  const modal = document.getElementById("infoModal");
  const modalMessage = document.getElementById("modalMessage");
  modalMessage.textContent = message;
  modal.style.display = "block";
}

// Close modal
function closeModal() {
  const modal = document.getElementById("infoModal");
  modal.style.display = "none";
}

updateDisplayRght();
