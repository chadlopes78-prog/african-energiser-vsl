const HEADLINE = "BREAKING: THE AFRICAN ENERGISER THAT WILL END YOUR HUMILIATION HAS BEEN REVEALED";

(function applyHeadline() {
  const el = document.getElementById("vsl-headline");
  if (!el) return;
  const raw = HEADLINE.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
  const escaped = raw.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
  const match = escaped.match(/^(BREAKING:\s*)([\s\S]*)$/i);
  if (match) {
    el.innerHTML = '<span class="breaking">' + match[1].toUpperCase() + '</span>' + match[2].toUpperCase();
  } else {
    el.textContent = escaped.toUpperCase();
  }
})();

(function liveComments() {
  var MALE = [
    ["Thabo M.", "#C2410C"], ["Sipho D.", "#047857"], ["Andile N.", "#1D4ED8"],
    ["Kagiso T.", "#0F766E"], ["Bongani L.", "#0369A1"], ["Mandla C.", "#365314"],
    ["Sibusiso K.", "#9A3412"], ["Lucky N.", "#7C2D12"]
  ];
  var FEMALE = [
    ["Lerato K.", "#B45309"], ["Nomsa P.", "#6D28D9"], ["Zanele R.", "#BE185D"],
    ["Ayanda S.", "#9A3412"], ["Precious M.", "#7C3AED"], ["Refilwe J.", "#A21CAF"],
    ["Nthabiseng D.", "#BE123C"], ["Palesa M.", "#86198F"]
  ];
  var MALE_TEXTS = [
    "This method actually works. Last night I smashed for 4 rounds straight.",
    "Bro I thought I was finished. Now she can't walk properly.",
    "Joburg boys know... I used this and she was screaming my name.",
    "Yesterday I went 4 rounds. She begged me to stop. I didn't.",
    "Cape Town checking in. My girl said I fuck different now.",
    "I used to last 2 minutes. Last night I owned that bed.",
    "Does this really keep you hard that long? Asking for a friend.",
    "Pretoria here. My wife came back twice. Never happened before.",
    "I almost skipped this. Glad I stayed. My dick is a weapon now.",
    "Durban men, try this. She will look at you different.",
    "I ate that pussy then went another 3 rounds. No joke.",
    "This live better not get taken down. I need the rest.",
    "Who else from SA actually tried this and lasted?",
    "She laughed at me last month. Not laughing anymore."
  ];
  var FEMALE_TEXTS = [
    "My husband used this method and now he fucks me like never before.",
    "Ladies... my man went 4 rounds last night. I can barely sit.",
    "I used to fake it. Last night I didn't have to.",
    "Whoever made this, thank you. My man is dangerous in bed now.",
    "Watching from Soweto. He woke me up twice. I'm not complaining.",
    "My husband used to finish too fast. Now he takes his time and ruins me.",
    "Is it just me or did every man in this live suddenly get confident?",
    "He came home from work and didn't even greet me. Straight to the bedroom.",
    "Cape Town wife here. I thought he was cheating with how hard he was.",
    "Please don't remove this video. I sent it to him already.",
    "He used this and now I can't keep up. Help.",
    "My man from Pretoria tried it. I almost called the neighbours.",
    "I asked him where he learned that. He said 'the live'.",
    "Girls if your man watches this, buy extra sheets."
  ];
  var TIMES = ["Just now", "Just now", "1 min", "1 min", "2 min", "3 min"];
  var list = document.getElementById("comments-list");
  var used = [];
  var visible = 0;
  var MAX = 7;

  function initials(name) {
    return name.split(" ").map(function (p) { return p[0]; }).join("").slice(0, 2);
  }

  function pick(arr, avoidLast) {
    var i, n = 0;
    do { i = Math.floor(Math.random() * arr.length); n++; }
    while (avoidLast === i && n < 8);
    return i;
  }

  function buildComment() {
    var female = Math.random() > 0.45;
    var poolN = female ? FEMALE : MALE;
    var poolT = female ? FEMALE_TEXTS : MALE_TEXTS;
    var ni = pick(poolN, used[0]);
    var ti = pick(poolT, used[1]);
    used = [ni, ti];
    var name = poolN[ni][0];
    var color = poolN[ni][1];
    var text = poolT[ti];
    var time = TIMES[Math.floor(Math.random() * TIMES.length)];
    var showLike = Math.random() > 0.55;
    var likes = showLike ? 1 + Math.floor(Math.random() * 8) : 0;
    var li = document.createElement("li");
    li.className = "comment";
    li.innerHTML =
      '<div class="avatar" style="background:' + color + '">' + initials(name) + '</div>' +
      '<div class="comment-body">' +
        '<div class="comment-top"><span class="comment-name">' + name + '</span><span class="comment-time">' + time + '</span></div>' +
        '<p class="comment-text">' + text + '</p>' +
        '<div class="comment-meta"><span>Like</span><span>Reply</span>' +
          (likes ? '<span>👍 ' + likes + '</span>' : '') +
        '</div>' +
      '</div>';
    return li;
  }

  function addComment(initial) {
    var li = buildComment();
    if (initial) li.style.animation = "none";
    list.appendChild(li);
    visible++;
    if (visible > MAX) {
      var first = list.querySelector(".comment:not(.leaving)");
      if (first) {
        first.classList.add("leaving");
        setTimeout(function () {
          if (first.parentNode) first.parentNode.removeChild(first);
          visible = Math.max(0, visible - 1);
        }, 220);
      }
    }
  }

  function schedule() {
    var delay = 4000 + Math.random() * 4000;
    setTimeout(function () {
      addComment(false);
      schedule();
    }, delay);
  }

  var start = 4 + Math.floor(Math.random() * 3);
  for (var i = 0; i < start; i++) addComment(true);
  schedule();
})();

(function viewers() {
  var el = document.getElementById("viewer-count");
  var n = 245;
  function tick() {
    var delta = Math.floor(Math.random() * 7) - 3;
    n = Math.min(320, Math.max(230, n + delta));
    el.textContent = String(n);
    setTimeout(tick, 2500 + Math.random() * 2500);
  }
  setTimeout(tick, 3000);
})();
