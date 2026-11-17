export type AssociatedOffice = {
  id: string
  officeLocation: string
  companyName: string | null
  address: string | null
  telephoneNumbers: string[]
  email: string
}

export type AssociatedCountry = {
  id: string
  name: string
  isoNumeric: string
  flag: string
  offices: AssociatedOffice[]
}

const office = (id: string, officeLocation: string, companyName: string | null, address: string | null, telephoneNumbers: string[] = []): AssociatedOffice => ({
  id, officeLocation, companyName, address, telephoneNumbers,
  email: id.startsWith('bd-') ? 'info@alviline.com' : 'info@sealloyd.com',
})

export const associatedCountries: AssociatedCountry[] = [
  { id: 'bangladesh', name: 'Bangladesh', isoNumeric: '050', flag: '🇧🇩', offices: [
    office('bd-dhaka', 'Dhaka / ICD Kamlapur / ICT Pangaon', 'ALVI LINE BANGLADESH LIMITED', 'House# 14, 3rd Floor, Flat# C-2, Block# C, Main Road Banasree Dhaka – 1219, Bangladesh', ['+88 02 8399 889']),
    office('bd-chittagong', 'Chittagong', 'ALVI LINE BANGLADESH LIMITED', 'Joy Bangla Tower, 14th Floor, 36 Agrabad C/A, Chittagong-4100', ['+880 23333 22696', '+880 23333 22697']),
    office('bd-mongla', 'Mongla / Khulna', 'JAHAN SHIPPING LINES', '69, Lower Jessore Road (Ground Floor), Khulna, Bangladesh', ['+88 041 720 062']),
  ]},
  { id: 'china', name: 'China', isoNumeric: '156', flag: '🇨🇳', offices: [
    office('cn-shanghai', 'Shanghai', 'SEA LLOYD SHIPPING LINES (SHANGHAI) LIMITED', 'No 289, Wujin Road, Room 325 Hi Time Building, Hong Kou District, Shanghai 200081', ['+862136396735', '+862136396736', '+862136396737']),
    office('cn-qingdao', 'Qingdao', 'BENLINE AGENCIES (H.K.) LIMITED QINGDAO OFFICE', 'ROOM 4101 UNIT 1 BUILDING 2 YUEFU MANSION, NO.6 C SHANDONG ROAD, QINGDAO CHINA, POST CODE: 266071', ['0086021 61803920']),
    office('cn-shenzhen', 'Shekou / Yantian / Da Chan Bay', 'Ben Line Agencies (China) Ltd.', 'Rm 330 Guangfa Mansion, 2007 dong Men Nan Road, Shenzhen, China', ['(86755) 25181636']),
    office('cn-ningbo', 'Ningbo', 'Ben Line Agencies (China) Ltd. Ningbo Representative Office', 'Room 905, Portman Tower, No.48 Caihong Road (N), Ningbo, China, 315040', ['0086021 61803920']),
  ]},
  { id: 'hong-kong', name: 'Hong Kong', isoNumeric: '344', flag: '🇭🇰', offices: [office('hk-hong-kong', 'Hong Kong', 'SEA LLOYD SHIPPING LINES (HONG KONG) PVT. LIMITED', 'Unit 02, 8/F, Plaza 228, 228 Wan Chai Road, Hong Kong', ['(852) 2375 2068'])]},
  { id: 'india', name: 'India', isoNumeric: '356', flag: '🇮🇳', offices: [
    office('in-kolkata', 'Kolkata', 'SEA LLOYD SHIPPING LINES PVT LTD', 'Unit 205, 2nd floor, Arrjavv Square, 95A Elliot Road, Kolkata 700016', ['+91 33 4600 4075']),
    office('in-chennai', 'Chennai', 'SEA LLOYD SHIPPING LINES PVT LTD', 'ARMENIAN CENTRE, 3rd LEVEL, NO:94, ARMENIAN STREET, CHENNAI - 600 001, INDIA', ['+91 44 25264992']),
    office('in-tuticorin', 'Tuticorin', 'SEA LLOYD SHIPPING LINES PVT LTD', null),
    office('in-cochin', 'Cochin', 'SEA LLOYD SHIPPING LINES PVT LTD', null),
    office('in-mangalore', 'Mangalore', 'SEA LLOYD SHIPPING LINES PVT LTD', null),
    office('in-goa', 'Goa', 'SEA LLOYD SHIPPING LINES PVT LTD', null),
    office('in-mumbai', 'Mumbai / Nhava Sheva', 'SEA LLOYD SHIPPING LINES PVT LTD', 'Trishul Gold Mine, Office No. 1108, 11th Floor, B Wing, Sector 15, CBD Belapur, Navi Mumbai - 400614, Maharashtra, India', ['+91 22 4778 3539']),
    office('in-mundra', 'Mundra / New Delhi / ICD Locations WCI', 'SEA LLOYD SHIPPING LINES PVT LTD', 'Unit # 404, 4th Floor, DLF Tower-B, Jasola, New Delhi -110025, India', ['+91 11 45038792']),
    office('in-hyderabad', 'Hyderabad', null, null), office('in-vizag', 'Visakhapatnam / Vizag', null, null),
  ]},
  { id: 'indonesia',
     name: 'Indonesia', 
     isoNumeric: '360',
      flag: '🇮🇩', 
      offices: [office('id-surabaya', 'Surabaya', 'Pt. Indo Oceania Raya', 'JL. Teluk Buli No.8, Surabaya, East Java, Indonesia',
         ['+6231-3285420-23']),
          office('id-jakarta', 'Jakarta', 'JAGUAR LOGISTICS INDONESIA', 'PT. Jasa Guna Asia Raya, City Terrace Ruko Jatibening Park, Block 20-B, JL. Dr. Ratna, Jatibening, Bekasi 17412, Jakarta, Indonesia',
         ['+6221.29468885'])]},
 
 
  { id: 'iran',
     name: 'Iran', 
     isoNumeric: '364',
      flag: '🇮🇷', 
      offices: [office('ir-bandar-abbas', 'Bandar Abbas', 'Setareh Tadarok Darya Shipping Co.', 'No. 147, At the corner of 29th St., Vozara Ave., Tehran – Iran',
         ['98 21 888 78 501-504'])]},
  
  
  { id: 'iraq', 
    name: 'Iraq', 
    isoNumeric: '368', 
    flag: '🇮🇶', 
    offices: [office('iq-basrah', 'Basrah', 'Al Rashed United Shipping Services', 'Near Manawi Basha Hotel, Al Qahira Quarter, Area 301/59 Bldg. No.8, Basrah - Iraq',
         ['965 22912800'])]},
  
  
  { id: 'kenya',
     name: 'Kenya', 
     isoNumeric: '404', 
     flag: '🇰🇪', 
     offices: [office('ke-mombasa', 'Mombasa', 'Rais Shipping Services (Kenya) Ltd', 'P.O. Box: 87684-80100, Mombasa, Kenya',
         ['+254-41-2319460'])]},
  
  
  { id: 'kuwait', 
    name: 'Kuwait', 
    isoNumeric: '414',
     flag: '🇰🇼', 
     offices: [office('kw-shuwaikh', 'Shuwaikh Port / Shuaiba Port', 'Al Bader Shipping & Gen. Cont. Co.W.L.L', 'P O Box 12075, Shamiya 71651, Kuwait', 
        ['965 2240 0175'])]},
  
  
  { id: 'malaysia',
     name: 'Malaysia', 
     isoNumeric: '458', 
     flag: '🇲🇾', 
     offices: [office('my-port-klang', 'Port Klang', 'SEA LLOYD SHIPPING LINES SDN. BHD.', 'Ground Floor/1st Floor, Unit J-02, Block J, No 3, Persiaran Multimedia, I-City Seksyen 7, 40000, Shah Alam, Selangor'),
         office('my-johor', 'Johor Bahru / Pasir Gudang / Tanjung Pelepas', 'Sea Lloyd Shipping Lines Sdn Bhd', 'Please refer to Port Klang Office')]},
  
  
  { id: 'maldives',
     name: 'Maldives', 
     isoNumeric: '462', 
     flag: '🇲🇻', 
     offices: [office('mv-male', 'Male', 'SEA MASTER LINES MALDIVES PVT LTD', 'H.SAAHATH, 2ND FLOOR, FILIGAS MAGU MALE 20017, MALDIVES',
         ['(960) 333 1023'])]},
  
  
  { id: 'myanmar', 
    name: 'Myanmar', 
    isoNumeric: '104', 
    flag: '🇲🇲', 
    offices: [office('mm-yangon', 'Yangon', 'MTTM Integrated Shippinng & Logistics Company Limited', 'Room No: 808 (8th Floor), Law Pyi Wun Plaza, 37 Alan Pya Pagoda Road, Dagon Township, Myanmar', 
        ['+95- 8382527, 8382528'])]},
  
  
  { id: 'nepal', 
    name: 'Nepal',
     isoNumeric: '524',
      flag: '🇳🇵', 
      offices: [office('np-birgunj', 'ICD Birgunj', 'Sea Lloyd Shipping Lines Pvt. Ltd. – Nepal', 'BMC Building Dryport Sirsiya Nepal, WARD NO.25',
         ['+91 8981397497'])]},
  
  
  { id: 'pakistan',
    
    name: 'Pakistan',
     isoNumeric: '586', 
     flag: '🇵🇰', 
     offices: [office('pk-karachi', 'Karachi', 'MEKAAIL SHIPPING PVT LIMITED', '1/4 A, 3RD FLOOR, BLOCK-6 P.E.C.H.S. SHAR – E – FAISAL KARACHI, PAKISTAN', 
        ['+92-21-38693355'])]},
  
  
  { id: 'qatar', 
    name: 'Qatar',
     isoNumeric: '634',
      flag: '🇶🇦',
       offices: [office('qa-doha', 'Doha', null, null)]},
  
  
  { id: 'saudi-arabia',
     name: 'Saudi Arabia',
      isoNumeric: '682', 
      flag: '🇸🇦', 
      offices: [office('sa-riyadh', 'Riyadh', 'Kanoo Shipping', 'PO Box 753, Riyadh-11421, Kingdom of Saudi Arabia', 
        ['966 11 4770372']), office('sa-dammam', 'Dammam', 'Kanoo Shipping', 'King Saud Street, P.O. Box – 37, Dammam – 31411, Kingdom of Saudi Arabia',
             ['966 3 8356000, 4387'])]},
  
  
  { id: 'singapore', 
    name: 'Singapore',
     isoNumeric: '702',
      flag: '🇸🇬', 
      offices: [office('sg-singapore', 'Singapore', 'SEA LLOYD SHIPPING LINES PTE LTD', '10 Anson Road #22-08, International Plaza, Singapore 079903',
         ['+65 6291 4540', '+65 6291 4541'])]},
  
  
  { id: 'sri-lanka', 
    name: 'Sri Lanka',
     isoNumeric: '144', 
     flag: '🇱🇰', 
     offices: [office('lk-colombo', 'Colombo', 'Nippon Marine Logistics Lanka ( Pvt ) Ltd', 'No 110, Kotahena Street, Colombo 13, Sri Lanka',
         ['0094-713225155'])]},
  
  
  { id: 'tanzania',
     name: 'Tanzania',
      isoNumeric: '834',
       flag: '🇹🇿', 
       offices: [office('tz-dar', 'Dar es Salaam', 'Rais Shipping Services (Tanzania) Ltd', 'P.O. Box No. 79869, 2nd Floor, Room No. 224, Harbour View Towers, Samora Avenue, Dar Es Salaam, Tanzania.',
         ['+255 22 213660/61'])]},
  
  
  { id: 'thailand', 
    name: 'Thailand',
     isoNumeric: '764', 
     flag: '🇹🇭',
      offices: [office('th-bangkok', 'Bangkok / Laem Chabang', 'ALVI LINE THAILAND CO., LIMITED', null)]},
  
  
  { id: 'united-arab-emirates',
     name: 'United Arab Emirates',
      isoNumeric: '784',
       flag: '🇦🇪',
        offices: [office('ae-jebel-ali', 'Jebel Ali', 'SEA LLOYD SHIPPING LINES LLC', 'OFFICE NO 402, 4TH FLOOR, 312 AL SOUQ AL KHABEER, DR SAEED AL YOUSUF COMPLEX, DUBAI PO BOX 118209', 
            ['+971 4553 7237'])]},
  
  
  { id: 'vietnam',
     name: 'Vietnam', 
     isoNumeric: '704', 
     flag: '🇻🇳', 
     offices: [office('vn-ho-chi-minh', 'Ho Chi Minh City', 'Amasis Shipping Co; Ltd', 'No 37, D4 Street, Tan Hung Ward, District 7, Ho Chi Minh City.',
        ['+8462905666'])]},
]

export const directorySettings = { defaultCountryId: 'bangladesh' }
