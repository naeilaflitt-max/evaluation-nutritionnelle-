function calculs() {
    // Récupération des valeurs
    let tailleCorps = parseFloat(document.getElementById("tailleCorps").value); // taille corporelle en cm
    let poids = parseFloat(document.getElementById("poids").value);
    let poidsHab = parseFloat(document.getElementById("poidsHabituel").value);
    let tourPoitrine = parseFloat(document.getElementById("tourPoitrine").value);
    let tourTaille = parseFloat(document.getElementById("tourTaille").value);   // tour de taille
    let hanche = parseFloat(document.getElementById("hanche").value);           // tour de hanche
    let sexe = document.getElementById("sexe").value; // "Homme" ou "Femme"
    let age = parseFloat(document.getElementById("age").value);
    let nap = parseFloat(document.getElementById("activite").value); // niveau d’activité

    // --- IMC ---
    let tailleM = tailleCorps / 100;
    let imc = poids / (tailleM * tailleM);
    let interpretationIMC = "", classeIMC = "";
    if (imc < 18.5) { interpretationIMC = "Insuffisance pondérale"; classeIMC = "high"; }
    else if (imc < 25) { interpretationIMC = "Corpulence normale"; classeIMC = "normal"; }
    else if (imc < 30) { interpretationIMC = "Surpoids"; classeIMC = "moderate"; }
    else if (imc < 35) { interpretationIMC = "Obésité modérée"; classeIMC = "high"; }
    else if (imc < 40) { interpretationIMC = "Obésité sévère"; classeIMC = "high"; }
    else { interpretationIMC = "Obésité morbide"; classeIMC = "high"; }

    // --- IMG (Indice de Masse Grasse) ---
    let S = (sexe === "Homme") ? 1 : 0; // Homme = 1, Femme = 0
    let img = (1.2 * imc) + (0.23 * age) - (10.8 * S) - 5.4;
    let interpretationIMG = "", classeIMG = "";
    if (sexe === "Homme") {
        if (img < 15) { interpretationIMG = "Trop faible"; classeIMG = "high"; }
        else if (img <= 20) { interpretationIMG = "Normal"; classeIMG = "normal"; }
        else if (img <= 25) { interpretationIMG = "Élevé"; classeIMG = "moderate"; }
        else { interpretationIMG = "Très élevé"; classeIMG = "high"; }
    } else {
        if (img < 20) { interpretationIMG = "Trop faible"; classeIMG = "high"; }
        else if (img <= 29, 99) { interpretationIMG = "Normal"; classeIMG = "normal"; }
        else if (img <= 30) { interpretationIMG = "Élevé"; classeIMG = "moderate"; }
        else { interpretationIMG = "Très élevé"; classeIMG = "high"; }
    }

    // --- MB & DEJ ---
    let mb = sexe === "Homme"
        ? 66.5 + (13.75 * poids) + (5.003 * tailleCorps) - (6.775 * age)
        : 655.1 + (9.563 * poids) + (1.850 * tailleCorps) - (4.676 * age);
    let dej = mb * nap;

    // --- Amaigrissement ---
    let amaigr = 100 * (poids - poidsHab) / poidsHab;
    let interpretationAmaigr = "", classeAmaigr = "";
    if (amaigr < 5) { interpretationAmaigr = "Non significatif"; classeAmaigr = "normal"; }
    else if (amaigr < 10) { interpretationAmaigr = "Modéré"; classeAmaigr = "moderate"; }
    else { interpretationAmaigr = "Sévère"; classeAmaigr = "high"; }

    // --- Poids idéal ---
    let lorentz = (sexe === "Femme")
        ? tailleCorps - ((tailleCorps - 150) / 2.5) - 100
        : tailleCorps - 100 - ((tailleCorps - 150) / 4);
    let bornhardt = (tailleCorps * tourPoitrine) / 240;

    // --- Rapport Taille/Hanche ---
    let rth = tourTaille / hanche;
    let interpretationRTH = "", classeRTH = "";
    if (sexe === "Homme") {
        if (rth < 0.90) { interpretationRTH = "Risque faible"; classeRTH = "normal"; }
        else if (rth <= 1.0) { interpretationRTH = "Risque modéré"; classeRTH = "moderate"; }
        else { interpretationRTH = "Risque élevé"; classeRTH = "high"; }
    } else if (sexe === "Femme") {
        if (rth < 0.80) { interpretationRTH = "Risque faible"; classeRTH = "normal"; }
        else if (rth <= 0.85) { interpretationRTH = "Risque modéré"; classeRTH = "moderate"; }
        else { interpretationRTH = "Risque élevé"; classeRTH = "high"; }
    }

    // --- Affichage ---
    document.getElementById("resultats").innerHTML = `
        <h3>Résultats :</h3>
        IMC : ${imc.toFixed(2)} → <span class="${classeIMC}">${interpretationIMC}</span><br>
        IMG : ${img.toFixed(2)} % → <span class="${classeIMG}">${interpretationIMG}</span><br>
        Métabolisme basal : ${mb.toFixed(0)} kcal/j<br>
        Besoins énergétiques journaliers : ${dej.toFixed(0)} kcal/j (activité : ${nap})<br>
        Amaigrissement : ${amaigr.toFixed(2)} % → <span class="${classeAmaigr}">${interpretationAmaigr}</span><br>
        Poids idéal Lorentz : ${lorentz.toFixed(2)} kg<br>
        Poids idéal Bornhardt : ${bornhardt.toFixed(2)} kg<br>
        Rapport Taille/Hanche : ${rth.toFixed(2)} → <span class="${classeRTH}">${interpretationRTH}</span>
    `;
}



