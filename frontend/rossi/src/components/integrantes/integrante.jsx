import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Error from '/error-404.png'
import Github from '/github.png'

export default function integrantes(){
    const boxers = {
	"coscu": {
		"clip": { clipPath: "polygon(1% 0%, 0px 0px, 0px 100%, 80% 100%, 75% 83%, 67% 70%, 55% 57%, 45% 49%, 28.96% 45.19%, 38.77% 42.89%, 47.87% 43.34%, 56.77% 43.38%, 72.35% 42.41%, 80.06% 39.71%, 85.25% 36.14%, 103.21% 31.42%, 96.44% 26.49%, 97.15% 24.49%, 99.96% 22.25%, 98% 21%, 95% 18%, 94% 16%, 92% 14%, 89% 12%, 89% 10%, 68.98% 7.28%, 61.11% 4.31%, 31.51% 2.81%, 16.16% 3.26%);"
	}},
	"mayichi": {
		"clip": { clipPath: "polygon(100% 100%, 28% 100%, 22.43% 88.12%, 19% 72.46%, 4% 68%, 8% 43%, 8.25% 32%, 16% 18%, 21% 8%, 34.47% -0.07%, 58.49% -0.23%, 80% 6%, 79% 13%, 80% 18%, 77.24% 20.61%, 71% 24%, 68.66% 29.15%, 94% 40%, 88.24% 58.69%, 89.75% 72.69%, 99.25% 78.69%, 100% 100%);"
	}},
	"viruzz": {
		"clip": { clipPath: "polygon(90.46% 101.26%, 104.62% 99%, 96% 56%, 93% 48%, 86.58% 38.09%, 75.93% 29.98%, 76.85% 26.29%, 89% 22%, 90% 15%, 86.62% 9.67%, 90.08% -0.28%, 41.46% -2.61%, 26.23% 2.71%, 19.15% 15%, 30.77% 22%, 26% 25.68%, 6% 35%, 5% 61%, 6% 100%, 79% 100%)"
	}} ,
	"fernanfloo": {
		"clip": {clipPath : "polygon(76% 100%, 80.03% 101.88%, 87.03% 101.56%, 100% 100%, 102.42% 90.35%, 91% 85%, 80% 71%, 81% 60%, 81% 43%, 78% 33%, 62.64% 26.3%, 65.45% 24.4%, 71% 22%, 72% 16%, 76% 13%, 70.84% 8.25%, 67.45% 4.65%, 68.84% 1.6%, 62% -7px, 39% 0px, 23% 3%, 15% 5%, 8% 14%, 12.07% 21.03%, 17.16% 21.7%, 26.78% 22%, 22.78% 24.65%, 4% 31%, 0% 36%, 0% 42%, -3px 66%, -4px 72.33%, -3px 81%, 0px 87%, 0px 95%, 2% 100%, 13% 100%, 23% 100%)"
	}},
	"la-rivers": {
		"clip": {clipPath: "polygon(29% 100%, 17% 89%, 19% 81%, 23% 77%, 31% 72%, 38% 69%, 36% 63%, 32% 57%, 26% 53%, 24% 49%, 16% 47%, 9% 42%, 10% 35%, 11% 29%, 4% 26%, 9% 16%, 10% 10%, 10.47% 5%, 15% 0px, 45% 0px, 61% 0px, 67% 0px, 76% 4%, 81.13% 5.64%, 84.8% 9.19%, 89.27% 14%, 93.2% 17.19%, 87.8% 22%, 81.47% 27.7%, 67.93% 29.72%, 71.4% 34%, 79% 38%, 89% 42%, 94% 45%, 96.27% 52%, 95.93% 55%, 91.53% 60%, 93.4% 63.64%, 97.67% 68%, 94.4% 72.64%, 96.53% 78.28%, 101.6% 83.28%, 96% 90%, 95% 93%, 97% 98%, 97% 100%, 95% 100%);"
	}},
	"papigavi": {
		"clip": {clipPath: "polygon(79% 100%, 83.82% 85.28%, 92.6% 79.78%, 97.86% 75.13%, 104.04% 69.66%, 100% 61%, 89% 54%, 81% 36%, 74.8% 28.51%, 73% 25%, 74% 21%, 82% 19%, 81% 15%, 84% 12%, 84% 6%, 74% 2%, 48% 0px, 36% 2%, 33% 9%, 31% 17%, 21% 20%, 11% 23%, 3% 27%, 0px 34%, 0px 49%, 0px 61%, 0px 69%, 7% 75%, 10% 84%, 18% 87%, 23% 100%);"
	}},
	"ampeter": {
		"clip": {clipPath: "polygon(14% 100%, 94% 100%, 94% 92%, 100% 87%, 100% 42%, 100% 34%, 75% 25%, 65% 22%, 65% 17%, 75% 10%, 73% 3%, 60% 1%, 29% 0px, 23% 3%, 24% 4%, 21% 7%, 20% 10%, 16% 13%, 20% 18%, 24% 22%, 26.14% 23.17%, 30.26% 26%, 35% 29%, 23% 31%, 20.24% 37.81%, 18.71% 53.03%, 10.14% 61.75%, 0px 69%, -5.24% 80.11%, 0px 88%, 4.22% 89.51%, 13% 94%);"
	}},
	"rivers": {
		"clip": {clipPath: "polygon(32% 100%, 83% 100%, 86.49% 92.37%, 98.14% 82%, 101.21% 73.63%, 95.63% 60.63%, 95.28% 52.49%, 101.35% 41%, 105.35% 32.63%, 83.42% 23.26%, 79.28% 11%, 76.56% 1.88%, 44% -0.49%, 22.72% 2.63%, 14.65% 11.37%, 16.58% 19%, 16.65% 28%, 19% 40%, 18% 44%, 16.51% 50.37%, 9.65% 63.63%, -1.21% 79%, 8% 86.61%, 22.51% 89.45%);"
	}},
	"luzu": {
		"clip": {clipPath: "polygon(8% 100%, 87% 100%, 102.85% 70.7%, 102.85% 36%, 92.71% 28%, 82.31% 24%, 79.61% 20.7%, 84.9% 15.7%, 90% 8%, 79.9% 1.24%, 45% -1px, 21.1% 4.49%, 16.24% 16.7%, 19.24% 22.05%, 29.24% 24.4%, 38% 28%, 22% 32%, 11% 68%, 4% 82%, 5% 93%)"
	}},
	"shelao": {
		"clip": {clipPath: "polygon(12.00% 99.33%, 88% 100%, 90% 90%, 94% 84%, 91% 71%, 100% 62%, 100% 34%, 78% 26%, 66% 23%, 72.49% 10%, 66.66% 4.67%, 42% 2%, 25% 7%, 14% 16%, 16.67% 22.33%, 29.18% 26.31%, 31% 29%, 17.34% 35.33%, 17% 43%, 11% 66%, 0px 74%, -3px 88.64%, 11.51% 88.31%, 11% 92%);"
	}},
	"amouranth": {
		"clip": {clipPath: "polygon(89% 100%, 95% 86%, 100% 64%, 79.96% 56.39%, 85% 48%, 98% 48%, 100% 42%, 100% 35%, 100% 16%, 95.69% 10.61%, 79.35% -2px, 46% -0.84%, 33% 5%, 36.89% 14%, 33.35% 17.31%, 38.93% 20%, 45.61% 26.14%, 35% 32%, 21.27% 39.08%, 23.93% 45.69%, 31.25% 48.47%, 33% 57%, 30% 65%, 0px 83%, 0px 100%)"
	}},
	"german": {
		"clip": {clipPath: "polygon(12% 100%, -9.12% 98.93%, 4.95% 87.25%, 6.98% 72.25%, 2.94% 63%, 13.96% 54.26%, 71% 42%, 74% 40%, 60.93% 41.88%, 43% 43.14%, 22.95% 38.9%, 8.87% 32.67%, 8.9% 25.7%, 4.94% 20.98%, -15.18% 14.46%, 32.21% 0px, 100% 0px, 100% 100%)"
	}}
}
    
const Integrantes = [
  {
    "nombre": "Gonzalo Dettler",
    "edad": 19,
    "altura": 1.78,
    "año": 2025,
    "grupo": "a",
    "categoria": {
      "img": ""
    },
    "lo_que_hizo": "Diseñó el sistema principal del proyecto"
  },
  {
    "nombre": "Santiago Ruiz",
    "edad": 20,
    "altura": 1.74,
    "año": 2025,
    "grupo": "b",
    "categoria": {
      "img": ""
    },
    "lo_que_hizo": "Programó la interfaz gráfica"
  },
  {
    "nombre": "Adriel Acosta",
    "edad": 18,
    "altura": 1.82,
    "año": 2025,
    "grupo": "a",
    "categoria": {
      "img": ""
    },
    "lo_que_hizo": "Encargado del backend y la base de datos"
  },
  {
    "nombre": "Jorge Federico Giozzi",
    "edad": 18,
    "altura": 1.76,
    "año": 2025,
    "grupo": "b",
    "categoria": {
      "img": ""
    },
    "lo_que_hizo": "Documentó el proceso y redactó el informe técnico"
  },
  {
    "nombre": "Luca Gambini",
    "edad": 19,
    "altura": 1.70,
    "año": 2025,
    "grupo": "a",
    "categoria": {
      "img": ""
    },
    "lo_que_hizo": "Realizó pruebas y control de calidad"
  },
  {
    "nombre": "Federico Feltrin",
    "edad": 18,
    "altura": 1.83,
    "año": 2025,
    "grupo": "b",
    "categoria": {
      "img": ""
    },
    "lo_que_hizo": "Implementó los algoritmos de optimización"
  },
  {
    "nombre": "Neuquen Venezuela",
    "edad": 18,
    "altura": 1.75,
    "año": 2025,
    "grupo": "a",
    "categoria": {
      "img": ""
    },
    "lo_que_hizo": "Diseñó la base de datos y relaciones"
  },
  {
    "nombre": "Eloy Lezcano",
    "edad": 18,
    "altura": 1.68,
    "año": 2025,
    "grupo": "b",
    "categoria": {
      "img": ""
    },
    "lo_que_hizo": "Programó la comunicación entre módulos"
  },
  {
    "nombre": "Oscar Cabello",
    "edad": 19,
    "altura": 1.80,
    "año": 2025,
    "grupo": "a",
    "categoria": {
      "img": ""
    },
    "lo_que_hizo": "Se encargó del diseño del hardware"
  },
  {
    "nombre": "Melgar Bastiano",
    "edad": 18,
    "altura": 1.72,
    "año": 2025,
    "grupo": "b",
    "categoria": {
      "img": ""
    },
    "lo_que_hizo": "Supervisó el ensamblaje del proyecto"
  }
]

return (
    <>
    <section className='flex'>
        <div className="relative w-full">
          <img
            className="left-0 z-50"
            sizes="(max-width: 767px) 767px, 100vw"
            alt="Coscu"
            src={Error}
            fetchPriority="high"
            style={boxers.coscu.clip}
          />
          <img
            className="left-[5%] h-[80%] z-40 animate-fade-right"
            sizes="(max-width: 767px) 767px, 100vw"
            src={Github}
            alt="Mayichi"
            style={boxers.mayichi.clip}
          />
          <img
            className="left-[15%] h-[75%] z-30 animate-delay-300 animate-fade-right"
            sizes="(max-width: 767px) 767px, 100vw"
            alt="Viruzz"
            style={boxers.viruzz.clip}
          />
          <img
            className="left-[30%] h-[70%] z-20 animate-delay-500 animate-fade-right [clip-path:polygon(64%_27%,_83%_30%,_85%_72%,_100%_100%,_0_100%,_0_0,_75%_0)];"
            sizes="(max-width: 767px) 767px, 100vw"
            alt="Fernanfloo"
            style={boxers.fernanfloo.clip}
          />
          <img
            className="left-[45%] h-[68%] z-10 animate-delay-700 animate-fade-right"
            sizes="(max-width: 767px) 767px, 100vw"
            alt="La Rivers"
            style={boxers["la-rivers"].clip}
          />
          <img
            className="left-[50%] h-[63%] z-0 animate-delay-1000 animate-fade-right"
            sizes="(max-width: 767px) 767px, 100vw"
            alt="Papigavi"
            fetchPriority="low"
            style={boxers.papigavi.clip}
          />
        </div>

        <div className="relative w-full">
          <img
            className="right-0 h-full z-50"
            sizes="(max-width: 767px) 767px, 100vw"
            alt="Germán"
            fetchPriority="high"
            style={boxers.german.clip}
          />
          <img
            className="right-[5%] h-[80%] z-40 animate-fade-left"
            sizes="(max-width: 767px) 767px, 100vw"
            alt="Amouranth"
            style={boxers.amouranth.clip}
          />
          <img
            className="right-[15%] h-[75%] z-30 animate-fade-left animate-delay-300"
            sizes="(max-width: 767px) 767px, 100vw"
            alt="Shelao"
            style={boxers.shelao.clip}
          />
          <img
            className="right-[30%] h-[70%] z-20 animate-fade-left animate-delay-500"
            sizes="(max-width: 767px) 767px, 100vw"
            alt="Luzu"
            style={boxers.luzu.clip}
          />
          <img
            className="right-[42%] h-[66%] z-10 animate-fade-left animate-delay-700"
            sizes="(max-width: 767px) 767px, 100vw"
            alt="Rivers"
            style={boxers.rivers.clip}
          />
          <img
            className="right-[50%] h-[63%] z-0 animate-fade-left animate-delay-1000"
            sizes="(max-width: 767px) 767px, 100vw"
            alt="Ampeter"
            fetchPriority="low"
            style={boxers.ampeter.clip}
          />
        </div>

      <div
        id="combat"
        className="absolute bottom-48 z-50 mx-auto left-1/2 -translate-x-1/2 flex justify-center flex-col gap-y-0 opacity-0 invisible"
      >
        <div className="px-5 pt-4 pb-2 bg-black text-white text-center">
          <h3 className="font-boxing uppercase text-7xl">MAYICHI</h3>
        </div>

        <img
          alt=""
          width="64"
          height="64"
          className="w-16 mx-auto absolute left-1/2 -translate-x-1/2"
        />

        <div className="px-5 pt-4 pb-2 bg-white text-black text-center">
          <h3 className="font-boxing uppercase text-7xl">AMOURANTH</h3>
        </div>
      </div>
    </section>
    
    </>
)
}