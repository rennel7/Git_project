/* ═══════════════════════════════════════════
   CATÉGORIES COMPLÈTES
═══════════════════════════════════════════ */
var CATEGORIES = [
  { id: 'all',       label: '🌐 Tous les métiers' },
  { id: 'sante',     label: '🏥 Santé' },
  { id: 'beaute',    label: '💄 Beauté' },
  { id: 'maison',    label: '🏠 Maison' },
  { id: 'transport', label: '🚗 Transport' },
  { id: 'education', label: '📚 Éducation' },
  { id: 'juridique', label: '⚖️ Juridique & Finance' },
  { id: 'sport',     label: '💪 Sport & Bien-être' },
  { id: 'evenement', label: '🎉 Événements' },
];

/* ═══════════════════════════════════════════
   BASE DE DONNÉES PRESTATAIRES
   (30+ métiers, toutes villes du Cameroun)
═══════════════════════════════════════════ */
var PRESTATAIRES = [

  /* ── SANTÉ ── */
  { id:1,  nom:'Dr. Amina Fouda',     metier:'Dentiste',             cat:'sante',     ville:'Yaoundé',     note:4.8, avis:124, dispo:'libre',  emoji:'🦷', bg:'#e0f0e8', desc:'Chirurgie dentaire, blanchiment, détartrage. Cabinet moderne aux normes internationales.',       horaires:['08:00','09:30','11:00','14:00','15:30'], pris:['09:30'] },
  { id:2,  nom:'Dr. Basile Ewane',    metier:'Dentiste',             cat:'sante',     ville:'Buea',        note:4.5, avis:58,  dispo:'libre',  emoji:'🦷', bg:'#e0f0e8', desc:'Soins dentaires pour toute la famille. Détartrage, plombages, prothèses.',                       horaires:['09:00','11:00','14:00','16:00'],          pris:[] },
  { id:3,  nom:'Dr. Hervé Ondoa',     metier:'Médecin généraliste',  cat:'sante',     ville:'Douala',      note:4.6, avis:158, dispo:'occupe', emoji:'👨‍⚕️', bg:'#e5e8f5', desc:'Consultation générale, renouvellement ordonnances, suivi maladies chroniques.',               horaires:['09:00','10:30','14:00','16:30'],          pris:['09:00','10:30','14:00','16:30'] },
  { id:4,  nom:'Dr. Claire Mbarga',   metier:'Gynécologue',          cat:'sante',     ville:'Yaoundé',     note:4.9, avis:201, dispo:'libre',  emoji:'👩‍⚕️', bg:'#f5e5f0', desc:'Suivi grossesse, contraception, échographie, consultation gynécologique complète.',           horaires:['08:30','10:00','11:30','14:30','16:00'], pris:['10:00'] },
  { id:5,  nom:'Dr. Sophie Nkeng',    metier:'Gynécologue',          cat:'sante',     ville:'Douala',      note:4.7, avis:143, dispo:'libre',  emoji:'👩‍⚕️', bg:'#f5e5f0', desc:'Spécialiste en fertilité et suivi de grossesse à haut risque.',                               horaires:['09:00','11:00','14:00','16:00'],          pris:['14:00'] },
  { id:6,  nom:'Dr. Paul Tamba',      metier:'Pédiatre',             cat:'sante',     ville:'Yaoundé',     note:4.8, avis:189, dispo:'libre',  emoji:'👶', bg:'#fff0e0', desc:'Consultation pédiatrique, vaccination, suivi de croissance, urgences enfants.',                 horaires:['08:00','09:30','11:00','14:30'],          pris:['08:00'] },
  { id:7,  nom:'Dr. Rose Atangana',   metier:'Dermatologue',         cat:'sante',     ville:'Yaoundé',     note:4.6, avis:92,  dispo:'libre',  emoji:'🔬', bg:'#e8f5e0', desc:'Traitement acné, eczéma, psoriasis. Soins esthétiques médicaux.',                              horaires:['10:00','11:30','14:00','15:30'],          pris:[] },
  { id:8,  nom:'Fatima Bello',        metier:'Infirmière à domicile',cat:'sante',     ville:'Garoua',      note:4.7, avis:39,  dispo:'libre',  emoji:'💉', bg:'#e5e8f5', desc:'Soins infirmiers à domicile, pansements, injections, suivi post-opératoire.',                   horaires:['08:00','10:00','14:00','16:00'],          pris:[] },
  { id:9,  nom:'Dr. Alain Nzie',      metier:'Ophtalmologue',        cat:'sante',     ville:'Douala',      note:4.5, avis:67,  dispo:'libre',  emoji:'👁️', bg:'#e5e8f5', desc:'Examen de la vue, prescription de lunettes, traitement glaucome et cataracte.',                 horaires:['09:00','11:00','14:30','16:30'],          pris:['09:00'] },
  { id:10, nom:'Dr. Marie Essama',    metier:'Sage-femme',           cat:'sante',     ville:'Kribi',       note:4.9, avis:76,  dispo:'libre',  emoji:'🍼', bg:'#f5e5f0', desc:'Suivi de grossesse, préparation à l\'accouchement, consultation post-partum.',                  horaires:['08:00','10:00','13:00','15:00'],          pris:[] },
  { id:11, nom:'Dr. Jean Messi',      metier:'Cardiologue',          cat:'sante',     ville:'Yaoundé',     note:4.7, avis:112, dispo:'occupe', emoji:'❤️', bg:'#fde8e8', desc:'Consultation cardiologique, ECG, suivi hypertension et maladies cardiaques.',                  horaires:['09:00','10:30','14:00'],                  pris:['09:00','10:30','14:00'] },
  { id:12, nom:'Chantal Kom',         metier:'Psychologue',          cat:'sante',     ville:'Bafoussam',   note:4.8, avis:54,  dispo:'libre',  emoji:'🧠', bg:'#ede5f5', desc:'Thérapie individuelle, gestion du stress, anxiété, dépression et troubles du comportement.',   horaires:['10:00','11:30','14:00','15:30','17:00'], pris:['14:00'] },
  { id:13, nom:'Dr. Eric Ngono',      metier:'Kinésithérapeute',     cat:'sante',     ville:'Douala',      note:4.6, avis:83,  dispo:'libre',  emoji:'🦴', bg:'#e8f5e0', desc:'Rééducation motrice, douleurs dorsales, sport, traumatologie.',                                horaires:['08:00','09:30','11:00','14:00','15:30'], pris:['09:30','15:30'] },
  { id:14, nom:'Lucie Abena',         metier:'Nutritionniste',       cat:'sante',     ville:'Yaoundé',     note:4.5, avis:41,  dispo:'libre',  emoji:'🥗', bg:'#e8f5e0', desc:'Bilan nutritionnel, perte de poids, régimes thérapeutiques et équilibre alimentaire.',          horaires:['10:00','12:00','14:30','16:30'],          pris:[] },

  /* ── BEAUTÉ ── */
  { id:15, nom:'Solange Ateba',       metier:'Coiffeuse',            cat:'beaute',    ville:'Bafoussam',   note:4.4, avis:45,  dispo:'libre',  emoji:'💇', bg:'#f5e5f0', desc:'Tresses, tissages, soins capillaires naturels et coiffures de mariage.',                       horaires:['09:00','11:00','13:00','15:00','17:00'], pris:['13:00'] },
  { id:16, nom:'Sandra Ewolo',        metier:'Esthéticienne',        cat:'beaute',    ville:'Kribi',       note:4.7, avis:88,  dispo:'libre',  emoji:'💆', bg:'#f5e5f0', desc:'Soins du visage, épilation, manucure, pédicure et soins du corps. Détente garantie.',          horaires:['09:00','10:30','12:00','14:00','16:00'], pris:['10:30'] },
  { id:17, nom:'Grace Nkoa',          metier:'Esthéticienne',        cat:'beaute',    ville:'Yaoundé',     note:4.8, avis:102, dispo:'libre',  emoji:'💆', bg:'#f5e5f0', desc:'Soin anti-âge, lifting, microdermabrasion, traitement des taches et épilation définitive.',     horaires:['09:00','11:00','13:00','15:00'],          pris:['09:00'] },
  { id:18, nom:'Nadège Biya',         metier:'Maquilleuse',          cat:'beaute',    ville:'Douala',      note:4.9, avis:134, dispo:'libre',  emoji:'💄', bg:'#f5e5f0', desc:'Maquillage de mariée, soirée et shooting photo. Spécialiste du teint et maquillage naturel.',  horaires:['08:00','10:00','12:00','14:00','16:00'], pris:['12:00'] },
  { id:19, nom:'Carole Tsimi',        metier:'Maquilleuse',          cat:'beaute',    ville:'Yaoundé',     note:4.6, avis:79,  dispo:'libre',  emoji:'💄', bg:'#f5e5f0', desc:'Maquillage artistique, formation maquillage, cours particuliers.',                            horaires:['09:00','11:00','14:00','16:00'],          pris:[] },
  { id:20, nom:'Patrick Nkomo',       metier:'Barbier',              cat:'beaute',    ville:'Yaoundé',     note:4.7, avis:167, dispo:'libre',  emoji:'✂️', bg:'#e8f0f5', desc:'Coupe homme, barbe, rasage traditionnel et soins capillaires pour hommes.',                    horaires:['08:00','09:00','10:00','11:00','14:00','15:00','16:00'], pris:['09:00','14:00'] },
  { id:21, nom:'Iris Meyo',           metier:'Manucure & Pédicure',  cat:'beaute',    ville:'Douala',      note:4.5, avis:63,  dispo:'libre',  emoji:'💅', bg:'#f5e5f0', desc:'Pose de gel, nail art, semi-permanent, soins des ongles naturels et pieds.',                  horaires:['10:00','11:30','13:00','14:30','16:00'], pris:['13:00'] },
  { id:22, nom:'Boris Kamga',         metier:'Coiffeur',             cat:'beaute',    ville:'Bafoussam',   note:4.3, avis:28,  dispo:'libre',  emoji:'💈', bg:'#e8f0f5', desc:'Coupe tendance, coloration, lissage brésilien et soins kératine.',                            horaires:['09:00','11:00','13:00','15:00'],          pris:[] },

  /* ── MAISON ── */
  { id:23, nom:'Paul Nkomo',          metier:'Plombier',             cat:'maison',    ville:'Douala',      note:4.5, avis:89,  dispo:'libre',  emoji:'🔧', bg:'#e5f0f8', desc:'Intervention rapide pour fuites, installation sanitaire et réparations d\'urgence.',            horaires:['07:00','10:00','13:00','16:00'],          pris:[] },
  { id:24, nom:'Alain Mvondo',        metier:'Plombier',             cat:'maison',    ville:'Yaoundé',     note:4.2, avis:43,  dispo:'libre',  emoji:'🔧', bg:'#e5f0f8', desc:'Débouchage canalisations, installation ballons d\'eau chaude, réparations toutes urgences.',   horaires:['07:30','10:30','13:30'],                  pris:['10:30'] },
  { id:25, nom:'Eric Bello',          metier:'Électricien',          cat:'maison',    ville:'Yaoundé',     note:4.3, avis:72,  dispo:'libre',  emoji:'⚡', bg:'#faf5e0', desc:'Installation électrique, dépannage, câblage réseau, pose de climatisation.',                  horaires:['08:00','11:00','14:00','16:00'],          pris:[] },
  { id:26, nom:'Carine Messi',        metier:'Femme de ménage',      cat:'maison',    ville:'Yaoundé',     note:4.7, avis:67,  dispo:'libre',  emoji:'🧹', bg:'#f5e8ec', desc:'Nettoyage complet, repassage, cuisine sur demande. Travail soigné et discret.',                 horaires:['08:00','10:00','14:00'],                  pris:['08:00'] },
  { id:27, nom:'Théodore Bikele',     metier:'Menuisier',            cat:'maison',    ville:'Douala',      note:4.4, avis:51,  dispo:'libre',  emoji:'🪵', bg:'#f5ede0', desc:'Fabrication meubles sur mesure, portes, fenêtres, cuisines et dressings.',                    horaires:['07:00','09:00','13:00','15:00'],          pris:['09:00'] },
  { id:28, nom:'Rodrigue Etoudi',     metier:'Peintre en bâtiment',  cat:'maison',    ville:'Yaoundé',     note:4.3, avis:38,  dispo:'libre',  emoji:'🖌️', bg:'#faf5e0', desc:'Peinture intérieure et extérieure, enduit, ravalement de façades.',                         horaires:['07:00','10:00','13:00'],                  pris:[] },
  { id:29, nom:'Samuel Abe',          metier:'Jardinier',            cat:'maison',    ville:'Douala',      note:4.6, avis:29,  dispo:'libre',  emoji:'🌿', bg:'#e8f5e0', desc:'Entretien jardins, tonte gazon, taille haies, création d\'espaces verts.',                    horaires:['07:00','09:00','14:00'],                  pris:[] },
  { id:30, nom:'Franck Owona',        metier:'Serrurier',            cat:'maison',    ville:'Yaoundé',     note:4.5, avis:44,  dispo:'occupe', emoji:'🔑', bg:'#e5e8f5', desc:'Ouverture portes, remplacement serrures, installation alarmes et coffres-forts.',               horaires:['08:00','12:00','16:00'],                  pris:['08:00','12:00','16:00'] },

  /* ── TRANSPORT ── */
  { id:31, nom:'Marcel Tchamba',      metier:'Chauffeur VTC',        cat:'transport', ville:'Yaoundé',     note:4.9, avis:203, dispo:'libre',  emoji:'🚗', bg:'#fff5e0', desc:'Véhicule climatisé, ponctuel. Disponible 7j/7 pour tous vos déplacements en ville.',          horaires:['06:00','08:00','10:00','12:00','14:00','18:00'], pris:['06:00','10:00'] },
  { id:32, nom:'Jean-Pierre Kom',     metier:'Chauffeur VTC',        cat:'transport', ville:'Douala',      note:4.6, avis:112, dispo:'libre',  emoji:'🚗', bg:'#fff5e0', desc:'Transport aéroport, courses en ville, longue distance. Disponible 24h/24.',                  horaires:['06:00','09:00','12:00','15:00','18:00'], pris:['09:00'] },
  { id:33, nom:'Bruno Ngah',          metier:'Déménageur',           cat:'transport', ville:'Douala',      note:4.4, avis:37,  dispo:'libre',  emoji:'📦', bg:'#e8f0f5', desc:'Déménagement particuliers et entreprises, camion disponible, manutentionnaires inclus.',       horaires:['07:00','09:00','13:00'],                  pris:[] },
  { id:34, nom:'Didier Essama',       metier:'Coursier',             cat:'transport', ville:'Yaoundé',     note:4.6, avis:89,  dispo:'libre',  emoji:'🛵', bg:'#fff5e0', desc:'Livraison express dans la ville, courses, documents, colis petits et moyens formats.',       horaires:['08:00','10:00','12:00','14:00','16:00'], pris:['10:00'] },

  /* ── ÉDUCATION ── */
  { id:35, nom:'Prof. Diane Elong',   metier:'Prof. de Mathématiques',cat:'education',ville:'Douala',      note:4.9, avis:31,  dispo:'libre',  emoji:'📐', bg:'#e5f0e8', desc:'Cours de maths lycée et concours grandes écoles. Méthodes éprouvées, résultats garantis.',   horaires:['16:00','17:30','19:00'],                  pris:['17:30'] },
  { id:36, nom:'Mireille Essomba',    metier:'Prof. de Français',    cat:'education', ville:'Yaoundé',     note:4.7, avis:44,  dispo:'libre',  emoji:'📝', bg:'#e5f0e8', desc:'Cours de français, dissertation, orthographe, préparation concours et baccalauréat.',       horaires:['15:00','17:00','19:00'],                  pris:[] },
  { id:37, nom:'Boris Ngo',           metier:'Formateur Informatique',cat:'education', ville:'Douala',      note:4.6, avis:52,  dispo:'libre',  emoji:'💻', bg:'#e5f0e8', desc:'Formation bureautique, Excel, Word, initiation programmation et réseaux.',                  horaires:['09:00','14:00','17:00'],                  pris:['09:00'] },
  { id:38, nom:'Alice Oyono',         metier:'Prof. d\'Anglais',     cat:'education', ville:'Bamenda',     note:4.8, avis:61,  dispo:'libre',  emoji:'🗣️', bg:'#e5f0e8', desc:'Cours d\'anglais tous niveaux, préparation TOEFL, IELTS et entretiens professionnels.',     horaires:['10:00','14:00','17:00','19:00'],          pris:['14:00'] },

  /* ── JURIDIQUE & FINANCE ── */
  { id:39, nom:'Me. Henri Bongo',     metier:'Avocat',               cat:'juridique', ville:'Yaoundé',     note:4.7, avis:78,  dispo:'libre',  emoji:'⚖️', bg:'#e8e5f5', desc:'Droit des affaires, droit immobilier, litiges civils et commerciaux au Cameroun.',           horaires:['09:00','11:00','14:00','16:00'],          pris:['09:00'] },
  { id:40, nom:'Martine Fouda',       metier:'Comptable',            cat:'juridique', ville:'Douala',      note:4.6, avis:55,  dispo:'libre',  emoji:'📊', bg:'#e8e5f5', desc:'Comptabilité TPE/PME, déclarations fiscales, bilans annuels et conseils financiers.',        horaires:['09:00','14:00','16:00'],                  pris:[] },
  { id:41, nom:'Me. Joseph Nlend',    metier:'Notaire',              cat:'juridique', ville:'Yaoundé',     note:4.8, avis:43,  dispo:'libre',  emoji:'📜', bg:'#e8e5f5', desc:'Actes notariaux, succession, vente immobilière, créations d\'entreprise.',                   horaires:['09:00','11:00','14:00'],                  pris:['11:00'] },

  /* ── SPORT & BIEN-ÊTRE ── */
  { id:42, nom:'David Abomo',         metier:'Coach sportif',        cat:'sport',     ville:'Yaoundé',     note:4.8, avis:94,  dispo:'libre',  emoji:'🏋️', bg:'#e8f5e0', desc:'Coaching fitness, perte de poids, prise de masse. Séances à domicile ou en salle.',         horaires:['06:00','08:00','17:00','18:30'],          pris:['06:00'] },
  { id:43, nom:'Laure Bikele',        metier:'Prof. de Yoga',        cat:'sport',     ville:'Douala',      note:4.9, avis:67,  dispo:'libre',  emoji:'🧘', bg:'#e8f5e0', desc:'Yoga débutant et avancé, méditation, relaxation et gestion du stress. Cours individuels.',   horaires:['07:00','09:00','17:00','19:00'],          pris:['07:00'] },
  { id:44, nom:'Steve Ndoumbe',       metier:'Masseur bien-être',    cat:'sport',     ville:'Kribi',       note:4.7, avis:48,  dispo:'libre',  emoji:'💆‍♂️', bg:'#e8f5e0', desc:'Massage relaxant, sportif, drainage lymphatique et réflexologie plantaire.',               horaires:['10:00','12:00','14:00','16:00'],          pris:['12:00'] },

  /* ── ÉVÉNEMENTS ── */
  { id:45, nom:'Lionel Nguema',       metier:'Photographe',          cat:'evenement', ville:'Yaoundé',     note:4.9, avis:156, dispo:'libre',  emoji:'📸', bg:'#f5f0e0', desc:'Photo mariage, portraits, événements d\'entreprise et shooting mode professionnel.',         horaires:['09:00','14:00'],                          pris:[] },
  { id:46, nom:'Ines Tagne',          metier:'Traiteur',             cat:'evenement', ville:'Douala',       note:4.7, avis:89,  dispo:'libre',  emoji:'🍽️', bg:'#f5f0e0', desc:'Cuisine camerounaise et internationale pour mariages, baptêmes, réceptions et séminaires.',  horaires:['08:00','12:00'],                          pris:['08:00'] },
  { id:47, nom:'Kevin Essama',        metier:'DJ',                   cat:'evenement', ville:'Douala',       note:4.6, avis:72,  dispo:'libre',  emoji:'🎧', bg:'#f5f0e0', desc:'Animation soirées, mariages, boîtes de nuit. Sonorisation pro et large répertoire musical.',  horaires:['18:00','20:00'],                          pris:[] },
  { id:48, nom:'Claire Ondo',         metier:'Décoratrice d\'événements', cat:'evenement', ville:'Yaoundé', note:4.8, avis:61, dispo:'libre',  emoji:'🎀', bg:'#f5f0e0', desc:'Décoration mariage, baptême et soirées. Fleurs, tables, arches et ambiances sur mesure.',    horaires:['09:00','14:00'],                          pris:[] },
];

/* ═══════════════════════════════════════════
   ÉTAT
═══════════════════════════════════════════ */
var catActive     = 'all';
var dispoFilter   = '';
var noteMin       = 0;
var selectedSlots = {};
var currentPrest  = null;

/* ═══════════════════════════════════════════
   INIT SIDEBAR CATEGORIES (catalogue)
═══════════════════════════════════════════ */
function initCats(activeCat) {
  catActive = activeCat || 'all';
  var listEl = document.getElementById('catList');
  if (!listEl) return;
  listEl.innerHTML = '';
  CATEGORIES.forEach(function(c) {
    var btn = document.createElement('button');
    btn.textContent = c.label;
    btn.className = (c.id === catActive) ? 'active' : '';
    btn.onclick = function() {
      catActive = c.id;
      document.querySelectorAll('.cat-list button').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      renderCards();
    };
    listEl.appendChild(btn);
  });
}

/* ═══════════════════════════════════════════
   FILTRES
═══════════════════════════════════════════ */
function setDispo(val) {
  dispoFilter = val;
  renderCards();
}
function setNote(btn, val) {
  noteMin = val;
  document.querySelectorAll('.note-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  renderCards();
}

/* ═══════════════════════════════════════════
   RENDU DES CARTES
═══════════════════════════════════════════ */
function renderCards() {
  var queryEl = document.getElementById('catQuery');
  var villeEl = document.getElementById('catVille');
  if (!queryEl || !villeEl) return;

  var query = queryEl.value.trim().toLowerCase();
  var ville = villeEl.value;

  var list = PRESTATAIRES.filter(function(p) {
    var okCat   = catActive === 'all' || p.cat === catActive;
    var okDispo = !dispoFilter || p.dispo === dispoFilter;
    var okVille = !ville || p.ville === ville;
    var okNote  = p.note >= noteMin;
    var okQuery = !query ||
      p.nom.toLowerCase().includes(query) ||
      p.metier.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query) ||
      p.ville.toLowerCase().includes(query) ||
      p.cat.toLowerCase().includes(query);
    return okCat && okDispo && okVille && okNote && okQuery;
  });

  var grid = document.getElementById('grid');
  var info = document.getElementById('resultInfo');
  if (!grid) return;
  grid.innerHTML = '';

  var libres = list.filter(function(p){ return p.dispo === 'libre'; }).length;

  // Message résultat
  if (info) {
    if (list.length === 0) {
      info.innerHTML = 'Aucun prestataire trouvé pour cette recherche.';
    } else {
      info.innerHTML =
        '<strong>' + list.length + '</strong> prestataire' + (list.length>1?'s':'') + ' trouvé' + (list.length>1?'s':'') +
        ' — <strong>' + libres + '</strong> disponible' + (libres>1?'s':'') + ' maintenant';
    }
  }

  // Si vraiment aucun résultat : suggérer de tout afficher
  if (list.length === 0) {
    var suggestion = PRESTATAIRES.filter(function(p){
      return p.dispo === 'libre';
    }).slice(0, 6);

    var emptyDiv = document.createElement('div');
    emptyDiv.className = 'empty';
    emptyDiv.innerHTML =
      '<div class="icon">🔍</div>' +
      '<p>Aucun prestataire trouvé pour <strong>"' + (query || ville) + '"</strong>.<br>' +
      'Voici quelques prestataires disponibles en ce moment :</p>';
    grid.appendChild(emptyDiv);
    list = suggestion;
  }

  list.forEach(function(p) {
    var slot = selectedSlots[p.id] || null;
    var slotsHTML = p.horaires.map(function(h) {
      var taken = p.pris.includes(h);
      var sel   = (slot === h);
      return '<button class="slot ' + (taken?'taken':'') + ' ' + (sel?'selected':'') + '" ' +
        (taken ? 'disabled title="Déjà réservé"' : '') +
        ' onclick="selectSlot(' + p.id + ',\'' + h + '\',this)">' + h + '</button>';
    }).join('');

    var card = document.createElement('div');
    card.className = 'card';
    card.innerHTML =
      '<div class="card-head">' +
        '<div class="avatar" style="background:' + p.bg + '">' + p.emoji + '</div>' +
        '<div class="card-info">' +
          '<h3>' + p.nom + '</h3>' +
          '<div class="job">' + p.metier + '</div>' +
          '<div class="city">📍 ' + p.ville + '</div>' +
          '<div class="stars">★' + p.note + '<span> (' + p.avis + ' avis)</span></div>' +
        '</div>' +
        '<span class="badge ' + p.dispo + '">' + (p.dispo==='libre'?'✅ Libre':'🔴 Occupé') + '</span>' +
      '</div>' +
      '<div class="card-body"><p>' + p.desc + '</p></div>' +
      '<div class="horaires">' +
        '<div class="hor-title">🕐 Créneaux disponibles</div>' +
        '<div class="slots" id="slots-' + p.id + '">' + slotsHTML + '</div>' +
      '</div>' +
      '<div class="card-foot">' +
        '<button class="btn-reserver" id="btn-' + p.id + '" ' +
          ((!slot || p.dispo==='occupe') ? 'disabled' : '') +
          ' onclick="openModal(' + p.id + ')">' +
          (p.dispo==='occupe' ? '🔴 Indisponible' : slot ? '📅 Réserver '+slot : 'Choisir un créneau') +
        '</button>' +
      '</div>';
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════
   CRÉNEAU
═══════════════════════════════════════════ */
function selectSlot(prestId, heure, btn) {
  document.querySelectorAll('#slots-'+prestId+' .slot').forEach(function(s){ s.classList.remove('selected'); });
  btn.classList.add('selected');
  selectedSlots[prestId] = heure;
  var b = document.getElementById('btn-'+prestId);
  if (b) { b.disabled = false; b.textContent = '📅 Réserver '+heure; }
}

/* ═══════════════════════════════════════════
   MODAL
═══════════════════════════════════════════ */
function openModal(prestId) {
  var p    = PRESTATAIRES.find(function(x){ return x.id===prestId; });
  var slot = selectedSlots[prestId];
  if (!p)    { showToast('Prestataire introuvable.','error'); return; }
  if (!slot) { showToast('Veuillez d\'abord choisir un créneau.','error'); return; }
  currentPrest = { id:p.id, nom:p.nom, metier:p.metier, ville:p.ville, emoji:p.emoji, slot:slot };
  document.getElementById('modal-info').innerHTML =
    '<strong>' + p.emoji + ' ' + p.nom + '</strong> — ' + p.metier + ' à ' + p.ville + '<br>' +
    '🕐 <strong>Créneau :</strong> ' + slot;
  ['inputNom','inputTel','inputDate','inputNote'].forEach(function(id){
    document.getElementById(id).value = '';
  });
  document.getElementById('overlay').classList.add('open');
}
function closeModal(e) {
  if (e.target === document.getElementById('overlay')) closeModalDirect();
}
function closeModalDirect() {
  document.getElementById('overlay').classList.remove('open');
  currentPrest = null;
}

/* ═══════════════════════════════════════════
   CONFIRMATION RÉSERVATION
═══════════════════════════════════════════ */
function confirmerReservation() {
  if (!currentPrest) { showToast('Erreur interne.','error'); return; }
  var nom  = document.getElementById('inputNom').value.trim();
  var tel  = document.getElementById('inputTel').value.trim();
  var date = document.getElementById('inputDate').value;

  if (!nom || nom.length < 3) {
    showToast('⚠️ Entrez votre nom complet (min. 3 caractères).','error'); return;
  }
  if (!tel || !/^[0-9]{6,15}$/.test(tel.replace(/\s/g,''))) {
    showToast('⚠️ Numéro invalide. 6 à 15 chiffres requis.','error'); return;
  }
  if (!date) {
    showToast('⚠️ Veuillez choisir une date.','error'); return;
  }
  var today = new Date().toISOString().split('T')[0];
  if (date < today) {
    showToast('⚠️ La date ne peut pas être dans le passé.','error'); return;
  }

  var p = PRESTATAIRES.find(function(x){ return x.id===currentPrest.id; });
  if (p && !p.pris.includes(currentPrest.slot)) p.pris.push(currentPrest.slot);

  var info = currentPrest;
  closeModalDirect();
  delete selectedSlots[info.id];
  renderCards();
  showToast('✅ Réservation confirmée avec '+info.nom+' à '+info.slot+' !','success');
}

/* ═══════════════════════════════════════════
   TOAST
═══════════════════════════════════════════ */
function showToast(msg, type) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast '+(type||'')+' show';
  setTimeout(function(){ t.classList.remove('show'); }, 3800);
}