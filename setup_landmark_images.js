// This script helps organize landmark images for each city
const cityLandmarks = {
    "jeddah": [
        "images/landmarks/Jeddah/برج جدة.jpg",
        "images/landmarks/Jeddah/جدة التاريخية.jpg",
        "images/landmarks/Jeddah/كورنيش جدة.jpg",
        "images/landmarks/Jeddah/نافورة جدة.jpg"
    ],
    "Riyadh": [
        "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2022/07/31/3346231-1205781789.jpg",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/382780991.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/discover-saudi/historical-diriyah.jpg",
        "https://media.cnn.com/api/v1/images/stellar/prod/230717102524-02-mukaab-riyadh-rendering.jpg"
    ],
    "mecca": [
        "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2023/06/14/3834471-1349607533.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/makkah-articles/makkah-clock-royal-tower.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/makkah-articles/jabal-al-nour.jpg",
        "https://gumlet.assettype.com/sabq%2F2022-07%2F76c8e1c1-6251-4751-8607-8e3a9e7037f3%2F%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D8%B1.jpg"
    ],
    "madinah": [
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/madinah-articles/madinah_banner.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/madinah-articles/quba-mosque.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/madinah-articles/uhud-mountain.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/madinah-articles/qiblatain-mosque.jpg"
    ],
    "taif": [
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/taif/Taif_Banner.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/taif/Al%20Shafa.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/taif/Taif%20Rose.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/taif/Rudaf%20Park.jpg"
    ],
    "dammam": [
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/dammam/Dammam_Corniche.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/dammam/King_Abdulaziz_Center.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/dammam/Marjan_Island.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/dammam/Dammam_Sea_Front.jpg"
    ],
    "abha": [
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/abha/Abha_Palace.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/abha/Al_Souda_Mountains.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/abha/Rijal_Almaa.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/abha/Abha_Cable_Car.jpg"
    ],
    "al ula": [
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/alula/Hegra.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/alula/Elephant_Rock.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/alula/Old_Town.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/alula/Maraya_Concert_Hall.jpg"
    ],
    "tabuk": [
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/tabuk/Neom_Beach.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/tabuk/Tabuk_Castle.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/tabuk/Tayeb_Al_Ism.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/tabuk/Wadi_Al_Disah.jpg"
    ],
    "al khobar": [
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/alkhobar/Khobar_Corniche.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/alkhobar/Khobar_Water_Tower.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/alkhobar/Science_Tech_Center.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/alkhobar/Ajdan_Walk.jpg"
    ],
    "yanbu": [
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/yanbu/Yanbu_Lake.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/yanbu/Historical_Area.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/yanbu/Royal_Commission.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/yanbu/Yanbu_Waterfront.jpg"
    ],
    "hail": [
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/hail/Jubbah_Rock_Art.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/hail/Airif_Castle.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/hail/Hail_Heritage_Village.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/hail/Al_Qishlah_Palace.jpg"
    ],
    "jazan": [
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/jazan/Farasan_Islands.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/jazan/Fifa_Mountains.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/jazan/Jazan_Waterfront.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/jazan/Traditional_Village.jpg"
    ],
    "najran": [
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/najran/Al_Aan_Palace.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/najran/Najran_Valley_Dam.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/najran/Abu_Hamdan_Village.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/najran/Historical_Najran.jpg"
    ],
    "arar": [
        "https://www.spa.gov.sa/galupload/normal/1442/2161442.jpg",
        "https://www.spa.gov.sa/galupload/normal/1442/2171442.jpg",
        "https://aawsat.com/sites/default/files/styles/article_img_top/public/2019/10/13/191013.jpg",
        "https://www.spa.gov.sa/galupload/normal/1442/2181442.jpg"
    ],
    "baha": [
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/albaha/Raghadan_Forest.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/albaha/Dhee_Ain_Village.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/albaha/Al_Baha_Forest.jpg",
        "https://www.visitsaudi.com/content/dam/saudi-tourism/media/destinations/albaha/Marble_Village.jpg"
    ]
};

// Instructions for downloading images:
console.log("Instructions for downloading landmark images:");
console.log("1. For each city, create a 'landmarks' directory inside its image folder");
console.log("2. Download the images from the URLs above and save them as landmark1.jpg, landmark2.jpg, etc.");
console.log("3. Place the downloaded images in the corresponding city's landmarks directory");

// Example directory structure:
console.log("\nExample directory structure:");
console.log("image/");
console.log("├── jeddah/");
console.log("│   ├── landmarks/");
console.log("│   │   ├── landmark1.jpg");
console.log("│   │   ├── landmark2.jpg");
console.log("│   │   ├── landmark3.jpg");
console.log("│   │   └── landmark4.jpg");
console.log("│   └── ...");
console.log("└── ...");

// To use this script:
console.log("\nTo use this script:");
console.log("1. Run this script to see the image URLs for each city");
console.log("2. Download the images manually or use a download manager");
console.log("3. Organize the images according to the directory structure above"); 