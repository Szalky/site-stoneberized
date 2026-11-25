/* Stoneberized — data: concerts and texts. Edit here. */
/* =========================================================
   CONCERTS — to add a show, copy one line and edit it.
   date: "YYYY-MM-DD"   link: optional (tickets / event page)
   note: text in English (en) and French (fr)
   venue / city can be plain text or { en: "...", fr: "..." }
   Shows move to "Past shows" automatically after their date.
   ========================================================= */
const SHOWS = [
  { date: "2027-04-10", venue: { en: "Soon to be announced", fr: "Bientôt annoncé" }, city: "",
    note: { en: "Stay tuned", fr: "Restez connectés" } },
  { date: "2026-12-04", venue: "OM Seraing", city: "Seraing, BE", link: "https://omconcerts.be/en/concert/bizkit-park-2/",
    note: { en: "Support for Bizkit Park", fr: "Première partie de Bizkit Park" } },
  { date: "2026-07-11", venue: "Mead House Festival", city: "" },
  { date: "2026-05-29", venue: "Primitive Music", city: "Romsée, BE",
    note: { en: "Wage Effect release show w/ Jungle Underground", fr: "Release show de Wage Effect avec Jungle Underground" } },
  { date: "2026-03-07", venue: "Metalfest", city: "Alleur, BE" },
];

/* =========================================================
   PHOTOS — carousel. Files go in img/gallery/ ; order = order below.
   by: photographer credit shown on the photo
   ========================================================= */
const GALLERY = [
  { file: "01.jpg", by: "Hugues Pagacz / Reflektor" },
  { file: "02.jpg", by: "Moksha Photo" },
  { file: "03.jpg", by: "Hugues Pagacz / Reflektor" },
  { file: "04.jpg", by: "Moksha Photo" },
  { file: "05.jpg", by: "Hugues Pagacz / Reflektor" },
  { file: "06.jpg", by: "Moksha Photo" },
  { file: "07.jpg", by: "Hugues Pagacz / Reflektor" },
  { file: "08.jpg", by: "Moksha Photo" },
  { file: "09.jpg", by: "Hugues Pagacz / Reflektor" },
  { file: "10.jpg", by: "Moksha Photo" },
  { file: "11.jpg", by: "Moksha Photo" },
  { file: "12.jpg", by: "Moksha Photo" },
];

/* =========================================================
   TEXTS — English (en) and French (fr)
   ========================================================= */
const T = {
  en: {
    nav_music:"Music", nav_shows:"Shows", nav_band:"Band", nav_merch:"Merch", nav_photos:"Photos", nav_contact:"Contact",
    h_photos:"Live <em>photos</em>", photo_by:"Photo:",
    merch_h:"<em>Merch</em>", merch_txt:"T-shirts and more are on their way. Ask us at a show or drop us a line.", merch_soon:"Coming soon", merch_btn:"Ask us",
    kicker:"New EP out now",
    sub:"Nu-metal from Liège, Belgium. Heavy riffs, thick textures, rap and scream.",
    listen:"Listen on Spotify", watch_yt:"Watch on YouTube",
    meta:"EP · 4 tracks · Released 15 May 2026",
    tracks:"Featuring the singles <b>Like A Dog</b> and <b>Smash It!</b> — both played on Classic 21.",
    h_shows:"Live <em>shows</em>", past:"Past shows", info:"Info",
    no_shows:"New dates coming soon — follow us to stay tuned.",
    h_band:"From <em>Liège</em>",
    bio1:"Stoneberized is a nu-metal band from Liège, Belgium, formed in 2022 and fed as much by stoner rock as by alternative metal.",
    bio2:"Their sound swings between weight and tension — massive riffs, thick textures and more frontal passages, carried by hybrid vocals somewhere between rap and scream. No walls between genres: the influences cross freely.",
    bio3:"After a first demo in 2023, aired on Classic 21, the band is back with <b>Wage Effect</b>, a 4-track EP built for the stage.",
    f_style:"Style", f_style_v:"Nu-metal / alternative metal", f_from:"From", f_from_v:"Liège, Belgium", f_rel:"Latest release",
    h_video:"Watch <em>us</em>", h_contact:"Get in <em>touch</em>",
    c_booking:"Shows, festivals, collaborations — write to us.",
    c_press_h:"Press kit", c_press:"Bio, photos, cover art and EPK (FR / EN).", c_press_btn:"Download EPK",
    c_follow_h:"Follow", c_follow:"News, videos and behind the scenes.",
    f_h:"Send us a message", f_name:"Name", f_email:"Your e-mail", f_subject:"Subject", f_msg:"Message", f_send:"Send",
    f_sending:"Sending…", f_ok:"Thanks! Your message has been sent — we'll get back to you soon.", f_err:"Oops, the message could not be sent. Please try again or write to stoneberized@outlook.com.",
    belgium:"Belgium"
  },
  fr: {
    nav_music:"Musique", nav_shows:"Concerts", nav_band:"Le groupe", nav_merch:"Merch", nav_photos:"Photos", nav_contact:"Contact",
    h_photos:"<em>Photos</em> live", photo_by:"Photo :",
    merch_h:"<em>Merch</em>", merch_txt:"T-shirts et autres articles arrivent bientôt. Demandez-nous au concert ou écrivez-nous.", merch_soon:"Bientôt disponible", merch_btn:"Nous contacter",
    kicker:"Nouvel EP disponible",
    sub:"Nu-metal liégeois. Riffs massifs, textures épaisses, rap et scream.",
    listen:"Écouter sur Spotify", watch_yt:"Voir sur YouTube",
    meta:"EP · 4 titres · Sorti le 15 mai 2026",
    tracks:"Avec les singles <b>Like A Dog</b> et <b>Smash It!</b> — tous deux diffusés sur Classic 21.",
    h_shows:"<em>Concerts</em>", past:"Concerts passés", info:"Infos",
    no_shows:"De nouvelles dates arrivent bientôt — suivez-nous pour ne rien rater.",
    h_band:"Made in <em>Liège</em>",
    bio1:"Stoneberized est un groupe nu-metal liégeois formé en 2022, nourri autant par le stoner que par le metal alternatif.",
    bio2:"Leur son oscille entre lourdeur et tension, alternant riffs massifs, textures épaisses et passages plus frontaux, portés par un chant hybride entre rap et scream. Le groupe revendique une approche sans cloison, où les influences se croisent librement.",
    bio3:"Après une première démo sortie en 2023 — diffusée sur Classic 21 — Stoneberized revient avec <b>Wage Effect</b>, un EP 4 titres pensé pour le live.",
    f_style:"Style", f_style_v:"Nu-metal / metal alternatif", f_from:"Origine", f_from_v:"Liège, Belgique", f_rel:"Dernière sortie",
    h_video:"En <em>vidéo</em>", h_contact:"<em>Contact</em>",
    c_booking:"Concerts, festivals, collaborations — écrivez-nous.",
    c_press_h:"Dossier presse", c_press:"Bio, photos, pochette et EPK (FR / EN).", c_press_btn:"Télécharger l'EPK",
    c_follow_h:"Suivez-nous", c_follow:"Actus, vidéos et coulisses.",
    f_h:"Envoyez-nous un message", f_name:"Nom", f_email:"Votre e-mail", f_subject:"Titre", f_msg:"Message", f_send:"Envoyer",
    f_sending:"Envoi…", f_ok:"Merci ! Votre message est bien parti, on vous répond vite.", f_err:"Oups, le message n'a pas pu être envoyé. Réessayez ou écrivez à stoneberized@outlook.com.",
    belgium:"Belgique"
  }
};
