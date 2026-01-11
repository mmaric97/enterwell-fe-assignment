docker build -t enterwell-fe-assignment .
docker run -p 3000:80 enterwell-fe-assignment
http://localhost:3000/


Uvod
Živimo u vremena kada su pub kvizovi postali toliko popularni da valjda svaki caffe bar, koji
iti malo drži do sebe, organizira neku svoju inačicu pub kviza. Iako nije caffe bar, Enterwell
prati ove trendove. Zadnjih par godina, 2 puta godišnje, Rejd (jedan od naših zaposlenika)
nas počasti pub kvizom iz svoje kućne radinosti. Pošto su u zadnje vrijeme naši zaposlenici
postali nezasitni znanja, Rejd je odlučio da će početi slagati online kvizove koje će im svako
toliko slati. Da bi Rejd uspio u svome naumu, potrebna mu je tvoja pomoć.
Tvoj zadatak je dakle izraditi Quiz Maker aplikaciju u nekom od JS frameworka (React, Vue,
Angular…) koju bi Rejd mogao koristiti za stvaranje i distribuciju svojih online kvizova.

Funkcionalni zahtjevi
Aplikacija treba podržavati sljedeće radnje:
● pregled svih dosad stvorenih kvizova
● stvaranje novog kviza
● uređivanje kviza
● brisanje kviza
● “rješavanje” kviza
U nastavku je malo detaljniji opis svakog od zahtjeva.

Pregled svih dosad stvorenih kvizova
Aplikacija treba imati stranicu na kojoj će se nalaziti tablica s popisom svih dosad
stvorenih kvizova (koji nisu u međuvremenu izbrisani). Svaki redak tablice mora prikazivati
ime kviza te gumbove kojima se nad kvizom obavljaju akcije brisanja i pokretanja
pregleda kviza. Klikom negdje drugdje na redak (dakle klikom bilo gdje osim na ranije
spomenuta dva gumba), pokreće se uređivanje kviza.
Osim tablice s popisom kvizova, na ovoj stranici bi trebao biti i gumb kojim bi se pokrenula
akcija stvaranja novog.

Stvaranje novog kviza
Novi kviz se stvara pomoću forme koja može biti u modalu ili na zasebnoj stranici. Kviz kao
entitet sastoji se od:
● naziva
● pitanja
Sva pitanja su istog formata te se svako pitanje sastoji od jednostavnog tekstualnog
pitanja i jednostavnog tekstualnog odgovora na to pitanje. Broj pitanja ne bi trebao
limitirati. Iako nema limita na broj pitanja, valja imati na umu da jedan Rejdov kviz obično
ima između 15 i 25 pitanja.
Pošto Rejdu ponekad zafali inspiracije, forma za stvaranje kviza bi trebala podržavati i
mogućnost “recikliranja” pitanja s prethodnih kvizova koje je stvorio. Recikliranje u ovom
smislu znači ubacivanje već prethodno napisanih pitanja u ovaj novi kviz.

Uređivanje kviza
Uređivanjem kviza bi se trebao moći promijeniti njegov naziv ili pitanja od kojih se sastoji.
Uređivanje se također obavlja kroz formu koja može biti u modalu ili na zasebnoj stranici.

Brisanje kviza
Brisanjem kviza se kviz miče iz sustava te više ne bi trebao biti vidljiv na popisu prethodno
stvorenih kvizova. Pitanja od kojih se taj kviz sastoji ne bi trebala biti izbrisana, već bi
trebala ostati u sustavu da ih se kasnije može reciklirati.

“Rješavanje” kviza
Jednom kad je kviz stvoren, on bi se trebao moći i “riješiti”. Ovi navodnici oko riješiti
sugeriraju da se on neće stvarno moći rješavati. Rejdova je ideja zapravo da aplikacija
unutar sebe ima stranicu na kojoj bi se moglo proći kroz sva pitanja kviza kao kroz neki
slideshow. Svaki slide u tom slideshowu treba prikazivati pitanje i gumb za otkrivanje
odgovora (odgovor je skriven dok se ne pritisne gumb za njegovo otkrivanje).


Da rezimiramo, jednom kad je kviz stvoren, on se pojavi u tablici s popisom kvizova. Svaki
redak u toj tablici ima gumb kojim se pokreće “rješavanje” kviza. Klikom na taj gumb,
otvara se stranica sa slideshowom pitanja kviza. Link te stranice će zatim Rejd kopirati i
ručno poslati svojim kolegama. Kolege će zatim taj link otvoriti na svojim mobilnim
uređajima i riješiti pitanja koja je Rejd za njih smislio.
Nefunkcionalni zahtjevi


Nije rijedak slučaj u developmentu da se frontend krene razvijati prije backenda te da
moramo raditi aplikaciju bez da komuniciramo s pravim API-jem. Sličan slučaj je i s ovim
zadatkom. Na poveznici u nastavku je specifikacija API-ja koji će tek biti implementirati:
http://quiz-maker.apidocs.enterwell.space.

Aplikacija treba biti oblikovana na način da, jednom kad API bude gotov, bude što
bezbolnije spojit ju s njim. U međuvremenu, podaci s kojima će se baratati (stvoreni kvizovi
i pitanja) trebaju biti nekako mockani.


Napomene
Naglasak ovog zadatka je prvenstveno na samim funkcionalnostima i logici. Izgled
aplikacije nam nije u tolikoj mjeri bitan te posljedično ni nikakvi stilovi nisu definirani.
Slobodni ste dakle koristiti MUI, Antd, Tailwind ili bilo koji drugi UI library koje će omogućiti
da aplikacija ipak izgleda dobro na kraju, bez da se puno zamarate pisanjem nekih custom
stilova.

Nije nužno riješiti cijeli zadatak, no naravno, što više riješite to bolje. Ideja nam je da kroz
ovaj zadatak provjerimo kako pristupate rješavanju problema, kako organizirate kod i kako
koristite najbolje prakse