(function () {
  var data = window.PITCH;
  if (!data) return;

  var quote = data.quote;
  var teeUnits = quote.tees.reduce(function (sum, tee) { return sum + tee.units; }, 0);
  var runUnits = quote.crewneck.units + teeUnits;

  if (Math.abs(data.proposedSplit.productUsd - quote.totalUsd - data.proposedSplit.leftoverUsd) > 0.02) {
    console.warn("pitch-data.js: leftoverUsd is not productUsd minus totalUsd");
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function money(amount, currency) {
    var value = Number(amount);
    var cents = Math.round(value * 100) % 100 !== 0;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: cents ? 2 : 0,
      maximumFractionDigits: 2
    }).format(value);
  }

  function usd(amount) { return money(amount, "USD"); }
  function eur(amount) { return money(amount, "EUR"); }

  function pct(amount) {
    return Number(amount).toFixed(1) + "%";
  }

  function field(value) {
    if (String(value).trim() === "[TBD]") {
      return '<span class="tbd">[TBD]</span>';
    }
    return esc(value);
  }

  function wordmark(width) {
    var img = data.images.wordmark;
    var style = width ? ' style="--wm:' + width + 'px"' : "";
    return '<span class="wordmark"' + style + '><img src="' + esc(img.src) + '" alt="' + esc(img.alt) + '" /></span>';
  }

  function photo(key) {
    var img = data.images[key];
    if (!img || !img.src) {
      var label = (data.missingImages && data.missingImages[key]) || "Placeholder — image not in the repo";
      return '<div class="ph" role="img" aria-label="' + esc(label) + '">' + esc(label) + "</div>";
    }
    return '<img src="' + esc(img.src) + '" alt="' + esc(img.alt) + '" style="object-position:' + esc(img.position || "center") + '" />';
  }

  function paragraphs(list) {
    return list.map(function (line) { return "<p>" + esc(line) + "</p>"; }).join("");
  }

  function manifesto() {
    var words = data.copy.manifestoSurvivors;
    var widths = ["5.2em", "7.6em", "3.8em", "6.2em", "3.2em"];
    return '<div class="man">' + words.map(function (word, index) {
      var bar = '<i class="bar" style="width:' + widths[index] + '"></i>';
      var lead = index === 0 ? wordmark(340) : "";
      return '<div class="man-line">' + bar + lead + '<span class="keep">' + esc(word) + "</span></div>";
    }).join("") + "</div>";
  }

  function costSheet() {
    var items = [quote.tees[0], quote.tees[1], quote.crewneck];
    var head = ["Piece", "Units", "Bulk", "Sample", "Landed", "Early gallery", "Margin"];
    var body = items.map(function (item) {
      var cells = [
        item.name,
        String(item.units),
        eur(item.bulkEur),
        eur(item.sampleEur),
        usd(item.landedUsd),
        usd(item.earlyGalleryUsd),
        pct(item.marginPct)
      ];
      return "<tr>" + cells.map(function (cell, index) {
        if (index === 0) return "<th scope=\"row\">" + esc(cell) + "</th>";
        return "<td data-label=\"" + esc(head[index]) + "\">" + esc(cell) + "</td>";
      }).join("") + "</tr>";
    }).join("");
    return "<table class=\"sheet\"><thead><tr>" +
      head.map(function (label) { return "<th scope=\"col\">" + esc(label) + "</th>"; }).join("") +
      "</tr></thead><tbody>" + body + "</tbody></table>";
  }

  function row(label, value) {
    return "<div><dt>" + esc(label) + "</dt><dd>" + esc(value) + "</dd></div>";
  }

  function proposalNote() {
    var split = data.proposedSplit;
    return (
      "If that proposed split were confirmed, " + usd(split.productUsd) +
      " would cover the quoted run (" + usd(quote.totalUsd) + ") and leave " +
      usd(split.leftoverUsd) +
      " for duty, labels, FX, and any follow-on once shipping is requoted. It is not enough for a second identical " +
      runUnits + "-piece order at this quote."
    );
  }

  var sales = data.earlySales;
  var through = data.sellThrough;
  var slides = [
    {
      id: "01",
      label: "Title",
      html:
        '<section class="slide slide--title" id="s01" data-index="0" data-label="Title">' +
        '<div class="slide-inner"><h1 class="vh">SHADOWBANNED</h1>' +
        wordmark() +
        '<p class="credit">' + esc(data.creditLine) + "</p></div></section>"
    },
    {
      id: "02",
      label: "Brand",
      html:
        '<section class="slide slide--split" id="s02" data-index="1" data-label="Brand">' +
        '<div class="slide-inner"><div class="copy"><p class="kicker">Brand</p>' +
        paragraphs(data.copy.brand) + manifesto() +
        '</div><div class="media">' + photo("brand") + "</div></div></section>"
    },
    {
      id: "03",
      label: "Product",
      html:
        '<section class="slide slide--product" id="s03" data-index="2" data-label="Product">' +
        '<div class="slide-inner"><div class="product-copy"><p class="kicker">Product</p>' +
        "<h2>Tees and crewnecks.</h2>" + paragraphs(data.copy.product) +
        '</div><div class="product-row"><div class="frame frame--zipper">' + photo("zipper") +
        '</div><div class="frame">' + photo("wordmarkGarment") +
        '</div><div class="frame">' + photo("museumLabel") +
        "</div></div></div></section>"
    },
    {
      id: "04",
      label: "Early sales",
      html:
        '<section class="slide slide--split" id="s04" data-index="3" data-label="Early sales">' +
        '<div class="slide-inner"><div class="media">' + photo("earlySales") +
        '</div><div class="copy"><p class="kicker">' + esc(sales.label) + "</p>" +
        '<p class="stat">' + esc(usd(sales.revenueAboutUsd)) + "</p>" +
        '<p class="stat-sub">Roughly, from ' + esc(sales.label.toLowerCase()) + ".</p>" +
        '<dl class="facts">' +
        row("Tees", "about " + sales.teesAbout + " at " + usd(sales.teePriceUsd)) +
        row("Crewnecks", "about " + sales.crewnecksAbout + " at " + usd(sales.crewPriceUsd)) +
        row("First sale", sales.firstSale) +
        "</dl><p>" + esc(sales.pricesChange) + "</p><p>" + esc(sales.channel) + "</p></div></div></section>"
    },
    {
      id: "05",
      label: "Positioning",
      html:
        '<section class="slide slide--split" id="s05" data-index="4" data-label="Positioning">' +
        '<div class="slide-inner"><div class="copy"><p class="kicker">Positioning</p>' +
        "<h2>A gallery object, not a mall brand.</h2>" + paragraphs(data.copy.positioning) +
        '</div><div class="media">' + photo("positioning") + "</div></div></section>"
    },
    {
      id: "06",
      label: "Team",
      html:
        '<section class="slide" id="s06" data-index="5" data-label="Team">' +
        '<div class="slide-inner"><p class="kicker">Team</p>' +
        '<div class="team-grid">' + data.copy.team.map(function (person) {
          var role = person.role ? '<p class="role">' + esc(person.role) + "</p>" : "";
          return '<article class="person"><div class="redact-field" aria-hidden="true"><span></span></div>' +
            "<h2>" + esc(person.name) + "</h2>" + role + "<p>" + esc(person.body) + "</p></article>";
        }).join("") + "</div></div></section>"
    },
    {
      id: "07",
      label: "Unit cost",
      html:
        '<section class="slide slide--cost" id="s07" data-index="6" data-label="Unit cost">' +
        '<div class="slide-inner"><div class="cost-top"><div>' +
        '<p class="kicker">Unit cost</p>' +
        '<p class="stat">' + esc(eur(quote.totalEur)) + "</p>" +
        '<p class="stat-sub">≈ ' + esc(usd(quote.totalUsdApprox)) +
        ' <span class="stat-exact">· ' + esc(usd(quote.totalUsd)) + " at " + esc(data.fx.source) +
        " " + esc(String(data.fx.rate)) + " on " + esc(data.fx.asOf) + "</span></p>" +
        '<p class="mix">' + quote.crewneck.units + " crewnecks + " + teeUnits + " tees. " +
        esc(quote.manufacturer) + ", " + esc(quote.origin) + ". Blended " +
        esc(usd(quote.blendedLandedUsd)) + " a piece.</p>" +
        '</div><div class="notes">' +
        '<p class="note">A line-item breakdown of the ' + esc(eur(quote.totalEur)) + " is still pending from the manufacturer.</p>" +
        '<p class="note">U.S. import duty and the museum labels are not included.</p>' +
        '<p class="note">Packaging (custom product bags, hang tags) is pending and may change unit cost.</p>' +
        '<p class="note">Landed unit cost spreads development, shipping, and the implied sample charges across ' +
        runUnits + " pieces — before duty and labels. Margins use early gallery prices.</p>" +
        "</div></div>" +
        costSheet() +
        '<ul class="sheet-compact">' + [quote.tees[0], quote.tees[1], quote.crewneck].map(function (item) {
          return "<li><strong>" + esc(item.name) + "</strong><span>" + item.units +
            " · bulk " + esc(eur(item.bulkEur)) + " · sample " + esc(eur(item.sampleEur)) +
            "</span><span>Landed " + esc(usd(item.landedUsd)) + " · early gallery " +
            esc(usd(item.earlyGalleryUsd)) + " · " + esc(pct(item.marginPct)) + "</span></li>";
        }).join("") + "</ul>" +
        '<p class="extras"><span>Development ' + esc(eur(quote.developmentEur)) + "</span>" +
        "<span>" + esc(quote.shippingLabel) + " " + esc(eur(quote.shippingEur)) + "</span>" +
        "<span>Samples " + esc(eur(quote.tees[0].sampleEur)) + " tee / " + esc(eur(quote.crewneck.sampleEur)) + " crewneck</span></p>" +
        "</div></section>"
    },
    {
      id: "08",
      label: "The ask",
      html:
        '<section class="slide slide--split slide--ask" id="s08" data-index="7" data-label="The ask">' +
        '<div class="slide-inner"><div class="copy"><div class="ask-grid">' +
        '<div><p class="kicker">The ask</p><p class="stat">' + esc(usd(data.askUsd)) + "</p>" +
        "<p>" + esc(data.copy.askLead) + " " + runUnits + " pieces (" + quote.crewneck.units +
        " crewnecks and " + teeUnits + " tees).</p></div>" +
        '<div><p class="kicker">' + esc(data.copy.instrumentLabel) + "</p>" + field(data.placeholders.instrument) + "</div>" +
        '<div><p class="kicker">' + esc(data.copy.splitLabel) + "</p>" + field(data.placeholders.split) +
        (data.proposedSplit.showProposedFigures
          ? '<ul class="proposed"><li><span>' + esc(data.proposedSplit.productLabel) +
            '</span><span>' + esc(usd(data.proposedSplit.productUsd)) + ' <em class="tag">proposed</em></span></li>' +
            "<li><span>" + esc(data.proposedSplit.campaignsLabel) + "</span><span>" +
            esc(usd(data.proposedSplit.campaignsUsd)) + ' <em class="tag">proposed</em></span></li></ul>' +
            '<p class="note">' + esc(proposalNote()) + "</p>"
          : "") +
        "</div></div></div><div class=\"media\">" + photo("ask") + "</div></div></section>"
    },
    {
      id: "09",
      label: "This run",
      html:
        '<section class="slide slide--run" id="s09" data-index="8" data-label="This run">' +
        '<div class="slide-inner"><p class="kicker">This run</p>' +
        '<p class="stat">' + esc(usd(through.revenueUsd)) + "</p>" +
        '<p class="run-line">' + through.teeUnits + " tees at " + esc(usd(through.teePriceUsd)) +
        ", and " + through.crewUnits + " crewnecks at " + esc(usd(through.crewPriceUsd)) +
        ", is " + esc(usd(through.revenueUsd)) + " if the run sells through.</p>" +
        "<p>Against the quoted product cost of " + esc(usd(through.productCostUsd)) +
        ", that is " + esc(usd(through.grossUsd)) + " gross, a " + esc(pct(through.marginPct)) +
        " margin. " + esc(through.before) + "</p>" +
        "<p>" + esc(through.pricesChange) + "</p>" +
        '<div class="tbd-block"><p class="kicker">' + esc(data.copy.newRetailLabel) + "</p>" +
        field(data.placeholders.newRetailPrices) + "</div>" +
        "<p>At an illustrative wholesale of half those prices, the same " +
        (through.teeUnits + through.crewUnits) + " pieces would bring in " +
        esc(usd(through.illustrativeWholesaleUsd)) + ". " + esc(through.wholesaleNote) + "</p>" +
        '<p class="kicker">' + esc(through.notAForecast) + "</p></div></section>"
    },
    {
      id: "10",
      label: "Social",
      html:
        '<section class="slide" id="s10" data-index="9" data-label="Social">' +
        '<div class="slide-inner"><div class="social-layout"><div>' +
        '<p class="kicker">Social</p><h2>Proof of attention, once the numbers are confirmed.</h2>' +
        "<p>" + esc(data.copy.socialLead) + "</p>" +
        '<div class="social-fields"><div><p class="kicker">' + esc(data.copy.socialHandleLabel) + "</p>" +
        field(data.placeholders.socialHandle) + '</div><div><p class="kicker">' +
        esc(data.copy.socialCountsLabel) + "</p>" + field(data.placeholders.socialCounts) +
        "</div></div></div>" + photo("socialGrid") + "</div></div></section>"
    },
    {
      id: "11",
      label: "Close",
      html:
        '<section class="slide slide--close" id="s11" data-index="10" data-label="Close">' +
        '<div class="slide-inner">' + wordmark() +
        '<p class="close-line">' + esc(usd(data.askUsd)) + ". " + esc(data.closeLine) + "</p>" +
        '<p class="credit">' + esc(data.credit) + "</p></div></section>"
    }
  ];

  var deck = document.getElementById("deck");
  deck.innerHTML = slides.map(function (slide) { return slide.html; }).join("");

  var nodes = Array.prototype.slice.call(deck.querySelectorAll(".slide"));
  var idxEl = document.getElementById("idx");
  var lblEl = document.getElementById("lbl");
  var ticks = document.getElementById("ticks");
  var current = 0;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  ticks.innerHTML = slides.map(function (slide, index) {
    return '<button type="button" class="tick" role="tab" data-go="' + index + '" aria-label="' +
      esc(slide.label) + '"></button>';
  }).join("");

  function setCurrent(index) {
    if (index < 0 || index >= nodes.length) return;
    current = index;
    idxEl.textContent = slides[index].id;
    lblEl.textContent = slides[index].label;
    Array.prototype.forEach.call(ticks.children, function (tick, tickIndex) {
      if (tickIndex === index) tick.setAttribute("aria-current", "true");
      else tick.removeAttribute("aria-current");
    });
    var hash = "#" + slides[index].id;
    if (location.hash !== hash) history.replaceState(null, "", hash);
  }

  function go(index) {
    if (index < 0 || index >= nodes.length) return;
    nodes[index].scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setCurrent(index);
  }

  document.getElementById("prev").addEventListener("click", function () { go(current - 1); });
  document.getElementById("next").addEventListener("click", function () { go(current + 1); });
  ticks.addEventListener("click", function (event) {
    var button = event.target.closest("[data-go]");
    if (!button) return;
    go(Number(button.getAttribute("data-go")));
  });

  document.addEventListener("keydown", function (event) {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    var onButton = event.target && event.target.closest && event.target.closest("button");
    var step = 0;
    if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "PageDown") step = 1;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "PageUp") step = -1;
    else if (event.key === " " && !onButton) step = event.shiftKey ? -1 : 1;
    else if (event.key === "Home") { event.preventDefault(); go(0); return; }
    else if (event.key === "End") { event.preventDefault(); go(nodes.length - 1); return; }
    if (!step) return;
    event.preventDefault();
    go(current + step);
  }, true);

  var startX = 0;
  var startY = 0;
  deck.addEventListener("touchstart", function (event) {
    startX = event.changedTouches[0].clientX;
    startY = event.changedTouches[0].clientY;
  }, { passive: true });
  deck.addEventListener("touchend", function (event) {
    var dx = event.changedTouches[0].clientX - startX;
    var dy = event.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.2) go(current + (dx < 0 ? 1 : -1));
  }, { passive: true });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          setCurrent(Number(entry.target.getAttribute("data-index")));
        }
      });
    }, { root: deck, threshold: [0.6] });
    nodes.forEach(function (node) { observer.observe(node); });
  }

  var fromHash = (location.hash || "").replace("#", "");
  var start = slides.findIndex(function (slide) { return slide.id === fromHash; });
  if (start > 0) {
    nodes[start].scrollIntoView({ behavior: "auto", block: "start" });
    setCurrent(start);
  } else {
    setCurrent(0);
  }
})();
