window.addEventListener("load", () => {
  let selectedCount = 0;

  // Step 1: Select "Excellent (5)" for each question
  const questions = document.querySelectorAll("fieldset.rating");
  questions.forEach((fieldset) => {
    const excellentOption = [...fieldset.querySelectorAll("input[type='radio']")]
      .find((input) => input.title?.includes("Excellent") || input.nextElementSibling?.title?.includes("Excellent"));

    if (excellentOption) {
      excellentOption.checked = true;
      selectedCount++;
    }
  });

  console.log(`✅ Selected ${selectedCount} Excellent (5) stars`);

  // Step 2: Count keywords in page text
  const pageText = document.body.innerText.toLowerCase();
  const instructorCount = (pageText.match(/instructor|the instructor/g) || []).length;
  const courseCount = (pageText.match(/course/g) || []).length;

  // Step 3: Define 6 random compliments for instructor and course
  const instructorComments = [
    "The instructor was absolutely fantastic! 🧠💡 Explained everything so clearly — learning felt effortless! 🚀",
    "One of the best instructors I’ve had! Friendly, clear, and always engaging. 🎯💬",
    "Great teaching style — kept the class interactive and super helpful throughout! 👏📘",
    "Amazing energy and passion in every lecture! Truly made a difference! 🔥👨‍🏫",
    "Very supportive and knowledgeable instructor! 🙌 Helped make even tough topics easy!",
    "Instructor made every class count 💡 — full of clarity, examples, and motivation! 💪"
  ];

  const courseComments = [
    "The course content was really well-organized and relevant to real-world applications! 📚✨",
    "Loved the way the course flowed from basics to advanced — very smooth learning journey! 🎓🚀",
    "A very informative and thoughtfully designed course. Would definitely recommend! 🌟👍",
    "The course structure made everything so understandable! Big thumbs up! 👍🧠",
    "Interesting, well-paced, and valuable content — every module was worth it! 💼🔍",
    "Great course experience overall — clear objectives, great material, and fun learning! 🎯📖"
  ];

  // Step 4: Pick comment based on keyword majority
  const selectedComment = instructorCount > courseCount
    ? instructorComments[Math.floor(Math.random() * instructorComments.length)]
    : courseComments[Math.floor(Math.random() * courseComments.length)];

  // Step 5: Fill comment box
  const commentBox = document.querySelector("#txtcomments");
  if (commentBox) {
    commentBox.value = selectedComment;
  }

  // Step 6: Show confirmation popup
  const submitBtn = document.querySelector("#SubmitBtn");
  if (submitBtn) {
    const confirmDiv = document.createElement("div");
    confirmDiv.style.position = "fixed";
    confirmDiv.style.bottom = "20px";
    confirmDiv.style.right = "20px";
    confirmDiv.style.padding = "14px 18px";
    confirmDiv.style.backgroundColor = "#fff";
    confirmDiv.style.border = "2px solid #007BFF";
    confirmDiv.style.borderRadius = "12px";
    confirmDiv.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
    confirmDiv.style.zIndex = 9999;
    confirmDiv.style.fontFamily = "Arial, sans-serif";
    confirmDiv.style.fontSize = "15px";

    confirmDiv.innerHTML = `
      <p style="margin: 0 0 10px;"><strong>🎓 Ready to Submit Your Feedback?</strong></p>
      <button id="confirmSubmit" style="margin-right: 10px; background-color: #28a745; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer;">✅ Confirm</button>
      <button id="cancelSubmit" style="background-color: #dc3545; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer;">❌ Not Now</button>
    `;

    document.body.appendChild(confirmDiv);

    document.getElementById("confirmSubmit").addEventListener("click", () => {
      console.log("📩 Feedback submitted automatically");
      confirmDiv.remove();
      submitBtn.click();
    });

    document.getElementById("cancelSubmit").addEventListener("click", () => {
      console.log("⏳ Submission left to user");
      confirmDiv.remove();
    });
  }
});
