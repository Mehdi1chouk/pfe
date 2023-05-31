import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  constructor() { }

  governorates = [


    {

      "name": "Ariana",
      "cities": [
        {
          "delegation": "Ariana Ville",
          "localite": ["Residence Kortoba", "Cite El Intissar 1", "Riadh Landlous", "Cite El Intissar 2", "Cite Jamil", "El Menzah 5", "El Menzah 6", "Ariana", "Centre Commercial Ikram",
            "Cite Des Roses", "Cite Du Jardin", "Cite Ennasr 1", "Cite Du Printemps", "Cite Ennasr 2", "Cite Ennouzha", "El Menzah 7", "Cite Essaada (Ariana)", "El Menzah 8", "Cite Jaafar",
            "Residence Ennour ( Naser 1)", "Nouvelle Ariana", "Residence Ennour ( Naser 2)", "Residence Ennour (Ariana)", "Cite De La Sante", "Borj El Baccouche", "Cite Essaada (Riadh Andalous)", "Cite Karim",
            "Cite Mehrzia 1", "Residence El Ouns", "Residence Ibn Zeidoun", "Cite Belvedere 2", "Residence Ichbilia", "Cite Du Soleil", "Cite Borj Turki 1", "Cite Borj Turki 2"],
          "cp": "2058"
        },

        {
          "delegation": "Sidi Thabet",
          "localite": ["Borj El Khoukha", "Borj Youssef", "Cebalet Ben Ammar", "Chorfech 12", "Cite Dridi", "Cite El Bokri", "Cite El Frachich", "Cite El Ghribi",
            "Cite El Methalithe", "Cite Messouda", "Cite Ouvriere", "Cite Sidi Marouane", "Bejaoua 2", "Ezzaouia", "Cite 18 Janvier", "Jabbes", "Cite Afh", "Jabbes El Borj", "Cite Des Agriculteurs",
            "Cite Des Oranges", "Cite El Gouazine", "Cite El Mbarka", "Cite El Mrezgua", "Cite Essaada", "Cite Ettbaieb", "Cite Jardins", "Cite Mongi Slim", "Sidi Thabet", "Chorfech", "Chorfech 2",
            "Chorfech 24", "Chorfech 8"],
          "cp": "2032"
        },
        {
          "delegation": "La Soukra",
          "localite": ["Cite Ezzitoun 1", "Cite Ezzitoun 2", "Cite Ezzouaidia", "Cite Farhat", "Cite Fateh", "Cite Fonciere", "Cite Snit", "Cite Touilia", "Dar Fadhal", "La Soukra",
            "Mosque Erraoudha", "Residence 26-26", "Residence Ahlem", "Residence Meriem", "Sidi Frej", "Sidi Salah", "Sidi Soufiene", "Village Essahli", "Borj Louzir", "Cite Ben Kilani", "Cite De La Sante",
            "Aeroport Tunis Carthage", "Cite El Behi Ladghem", "Charguia 1",
            "Cite El Feth", "Charguia 2", "Cite El Hana", "Station Marchandises Fret", "Cite El Mansoura", "Cite El Ouroud", "Chotrana 1", "Chotrana 2", "Cite Ennacim", "Cite Ennouzha 3", "Chotrana 3",
            "Cite Ettaamir 5", "Cite Astree", "Cite Ghouzaila", "Cite Belabla", "Cite Hedi Nouira", "Cite Ben Hessine", "Cite Bou Fares", "Cite Jebira", "Cite Snit", "Cite Chouachia", "Cite Star",
            "Cite Chouchene", "Residence El Ouns", "Cite De L'Aeroport", "Residence Ennesrine", "Cite De La Terre Libre", "Cite Des Juges", "Cite El Azzef", "Cite El Boustene 1", "Cite El Boustene 2",
            "Cite El Henaya", "Cite El Maid", "Cite Elyes", "Cite Ettaamir"],
          "cp": "2036"
        },
        {
          "delegation": "Kalaat Landlous",
          "localite": ["Borj El Hadj", "El Misra", "Ferme Hababou", "Ferme Mustapha", "Henchir Touba", "Henchir Toubias", "Pont De Bizerte", "Cite Bir El Araies", "Cite Des Martyrs", "Cite El Fejja",
            "Cite El Mourouj", "Cite El Oulja", "Cite Essibous", "Cite Tarek Ibn Zied", "Kalaat Landlous"],
          "cp": "2061"
        },
        {
          "delegation": "Raoued",
          "localite": ["Cite De La Rtt 2", "Cite El Abadla", "Cite El Amel", "Cite El Ghazala 1", "Cite El Ghazala 2", "Cite El Wafa", "Cite Ennasr", "Cite Ennkhilet", "Cite Essahafa", "Cite Ibn Rachik",
            "Cite Mehrzia 2", "Jaafar 1", "Jaafar 2", "Cite Chaker", "Cite De La Mosque", "Cite El Mouaouiet", "Cite El Mountazeh", "Complexe Technologique", "Cite Ennour Jaafar", "Cite Erriadh",
            "Cite Essaada", "Cite Sidi Slimene", "Cite Snit", "Douar El Hendi", "El Hessiene", "Oued El Khayat", "Oued El Makhzen", "Residence El Ayech", "Residence El Ouns", "Cite 7 Novembre", "Residence Ennarjes",
            "Cite Aeroport", "Residence Essalem", "Cite Chargui", "Residence Rim", "Cite Des Juges", "Route Ezzaouia", "Cite El Yamama", "Ariana Essoughra", "Cite Sidi Salah", "Borj Touil", "Cite Zghab",
            "El Brarja", "Bou Hnech", "Raoued"],
          "cp": "2083"
        },
        {
          "delegation": "Mnihla",
          "localite": ["Cite Ali Bourguiba", "Cite De La Republique", "Cite El Bassatine1", "Cite El Bassatine2", "Cite El Bassatine3", "Cite El Gouabsia", "Cite El Ouard", "Cite Ennasr",
            "Cite Essaada", "Cite Rafaha", "Cite Rous El Harayek", "Essanhaji", "Mnihla", "Residence Ennasr"],
          "cp": "2094"
        },
        {
          "delegation": "Ettadhamen",
          "localite": ["Cite 18 Janvier", "Cite Ben Yerfes", "Cite El Houda", "Cite Ennasser", "Cite Ettadhamen", "Cite Ettayarene", "Cite Sfar", "Cite Snit 2", "Cite Snit Nagra"],
          "cp": "2041"
        },
      ]


    },



    {
      "name": "Medenine",
      "cities": [
        {
          "delegation": "Houmet Essouk",
          "localite": ["Bazim", "Erriadh"],
          "cp": "4180"
        },
        {
          "delegation": "Beni Khedache",
          "localite": ["Cite Ennour"],
          "cp": "4110"
        },

      ]
    }
  ]




  removeDuplicateDelegations(cities: any[]): any[] {
    const uniqueDelegations = [];

    cities.forEach(city => {
      if (!uniqueDelegations.includes(city.delegation)) {
        uniqueDelegations.push(city.delegation);
      }
    });

    return uniqueDelegations;
  }



  getCitiesByRegion(regionName: string): any[] {
    const governorate = this.governorates.find(g => g.name === regionName);
    if (governorate) {
      return governorate.cities.map(city => city.delegation);
    } else {
      return [];
    }
  }


}







/*
   getRegions(): any[] {
     return this.data_ville;
   }
 
   getCitiesByRegion(regionId: string): any[] {
     const region = this.data_ville.find(r => r.region_id === Number(regionId));
     return region ? region.cities : [];
   }
 */

/*
  data_ville =
    [
      {
        "region_id": 1,
        "region_name": "Ariana",
        "cities": [
          {
            "city_id": 1,
            "city_name": "Ariana"
          },
          {
            "city_id": 2,
            "city_name": "Ettadhamen"
          },
          {
            "city_id": 3,
            "city_name": "Kalâat el-Andalous"
          },
          {
            "city_id": 4,
            "city_name": "La Soukra"
          },
          {
            "city_id": 5,
            "city_name": "Raoued"
          }
        ]
      },
      {
        "region_id": 2,
        "region_name": "Béja",
        "cities": [
          {
            "city_id": 6,
            "city_name": "Béja"
          },
          {
            "city_id": 7,
            "city_name": "Goubellat"
          },
          {
            "city_id": 8,
            "city_name": "Medjez El Bab"
          },
          {
            "city_id": 9,
            "city_name": "Teboursouk"
          },
          {
            "city_id": 10,
            "city_name": "Testour"
          }
        ]
      },
      {
        "region_id": 3,
        "region_name": "Ben Arous",
        "cities": [
          {
            "city_id": 11,
            "city_name": "Ben Arous"
          },
          {
            "city_id": 12,
            "city_name": "El Mourouj"
          },
          {
            "city_id": 13,
            "city_name": "Mornag"
          },
          {
            "city_id": 14,
            "city_name": "Roued"
          },
          {
            "city_id": 15,
            "city_name": "Salakta"
          }
        ]
      }
 
    ]
*/

/*
  governorates = [{
 
    {
      
 
    "name": "Mahdia",
    "cities": [
      {
        "delegation": "Mahdia",
        "localite": "Cite Des Infirmiers",
        "cp": "5111"
      },
      {
        "delegation": "Chorbane",
        "localite": "El Khiour",
        "cp": "5130"
      },
      {
        "delegation": "El Jem",
        "localite": "El Mechelette",
        "cp": "5160"
      },
      {
        "delegation": "El Jem",
        "localite": "Ouled Farhat",
        "cp": "5160"
      },
      {
        "delegation": "Chorbane",
        "localite": "Henchir Bouaziz",
        "cp": "5130"
      },
      {
        "delegation": "El Jem",
        "localite": "Sidi Bou Helal",
        "cp": "5160"
      },
      {
        "delegation": "Mahdia",
        "localite": "Cite Sidi Messaoud",
        "cp": "5111"
      }
    ]
  },
  {
    "name": "Mannouba",
    "cities": [
      {
        "delegation": "Tebourba",
        "localite": "El Mellaha",
        "cp": "1144"
      },
      {
        "delegation": "Jedaida",
        "localite": "Cite El Hidaya",
        "cp": "1124"
      },
      {
        "delegation": "Tebourba",
        "localite": "Gosset El Bey",
        "cp": "1144"
      },
      {
        "delegation": "Jedaida",
        "localite": "Cite Ennajet",
        "cp": "1124"
      }
    ]
  },
  {
    "name": "Medenine",
    "cities": [
      {
        "gouvernorat": "Medenine",
        "delegation": "Houmet Essouk",
        "localite": "Bazim",
        "cp": "4180"
      },
      {
        "gouvernorat": "Medenine",
        "delegation": "Beni Khedache",
        "localite": "Cite Ennour",
        "cp": "4110"
      },
      {
        "gouvernorat": "Medenine",
        "delegation": "Houmet Essouk",
        "localite": "Erriadh",
        "cp": "4146"
      }
    ]
  }
 
 
  ]
 
 
*/
