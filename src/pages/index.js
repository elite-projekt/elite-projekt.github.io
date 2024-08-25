import React from 'react';
import Layout from '@theme/Layout';
import './index.css'

export default function ELITE() {
  return (
    <Layout title="ELITE" description="ELITE - Cybersecurity Tool">
        <div style={{background:"#f8f8f8"}}>
    <div class="centered-text">
        <div class="card-background">
      <div style={{marginTop:"10%"}}>
        <h1>Um was geht es bei ELITE?</h1>
        <p>Im ELITE-Projekt geht es vorrangig darum, Unternehmen die Risiken von Cyberangriffen bewusst zu machen und ihnen sowie ihren Mitarbeiter:innen eine Plattform zu bieten, um ihr Wissen in IT-Sicherheit zu vertiefen. Dafür wurden realistische und erlebbare Demonstratoren entwickelt, die verschiedene Angriffstypen abdecken.</p>
      </div>
      <div>
        <h1>Risiken</h1>
        <p>Die Nutzung dieser Software erfolgt auf eigene Gefahr! Wir übernehmen keinerlei Haftung für Schäden jeglicher Art, die durch die Verwendung dieser Software entstehen könnten. Bitte beachten Sie, dass die Demonstratoren potenziell gefährlich sein können. Verwenden Sie die Demonstratoren daher nicht auf Produktivsystemen. Seien Sie sich der Risiken bewusst und handeln Sie entsprechend.</p>
      </div>
      <div>
        <h1>Demonstratoren</h1>
        <p>
            Die Demonstratoren sollen Unternehmen
            einen umfassenden und möglichst realistischen
            Überblick über die aktuelle Gefahrenlage
            bieten. Dazu zählen unter anderem
            Angriffe wie Phishing oder Ransomware.
            Zwar müssen die Demonstratoren lokal auf
            PCs installiert werden, sie werden jedoch
            über die Lernplattform gestartet und gestoppt.
            Dadurch bleibt das zugehörige
            Lernmaterial stets zugänglich und aktuell.
            Zudem lassen sich die Demonstratoren
            problemlos anpassen, hinzufügen oder entfernen.</p>
      </div>
      <div>
        <h1>Lernplattform</h1>
        <p>
            Jeder Demonstrator umfasst eine oder
            mehrere Lerneinheiten, die es ermöglichen,
            sich intensiv mit den jeweiligen
            Themen auseinanderzusetzen und tiefere
            Einblicke in die verschiedenen Fachbereiche
            zu erhalten. Die Lernmaterialien sind
            auf einer von der h_da betreuten Website
            verfügbar und bereits öffentlich zugänglich.
            Die Grundlage für die Demonstratoren und
            die Lernplattform wurde von Studierenden
            der h_da entwickelt und seit 2021 kontinuierlich
            vom ELITE-Team weiterentwickelt.</p>
            <p>Die aktuelle öffentliche Lernplattform zum Starten und Stoppen sowohl für das zugehörige Lernmaterial finden Sie hier.</p>
            <div class="container">
                <a href="https://portal.elite-projekt.de/">
                    <button>Lernplattform</button>
                </a>
            </div>

      </div>
      <div style={{marginBottom:"20%"}}>
        <h1>Beteiligte</h1>
        <p>Die zugrundeliegende Software von ELITE wurde von der Universität Hamburg und der Hochschule Darmstadt entwickelt. Der physische Aufbau wurde hauptsächlich von Fraunhofer IAO & FOKUS übernommen.
<br></br><br></br>Jeder Partner hat spezifisch zugewiesene Demonstratoren entwickelt und war für das Lernmaterial zu seinen eigenen Demonstratoren verantwortlich. </p>
      </div>
      </div>
      </div>
      </div>
    </Layout>
  );
}