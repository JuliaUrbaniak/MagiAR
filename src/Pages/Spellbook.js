import { useNavigate } from "react-router-dom";

import spellbook from '../spellbook.png';

import HeaderLogo from '../Components/HeaderLogo';

import GlaciusSpell from '../Components/GlaciusSpell';
import IgnisSpell from '../Components/IgnisSpell';
import ProtegoSpell from '../Components/ProtegoSpell';
import FulmenSpell from '../Components/FulmenSpell';
import SilencioSpell from '../Components/SilencioSpell';
import UmbraSpell from '../Components/UmbraSpell';
import AscensioSpell from '../Components/AscensioSpell';
import TenebraeSpell from '../Components/TenebraeSpell';
import TempestasSpell from '../Components/TempestasSpell';
import LuxSpell from '../Components/LuxSpell';

import '../App.css';


function Spellbook() {
    const navigate = useNavigate();
  return (
    <>

    <div className='container'>

      <div className="row">
        <HeaderLogo />
      </div>

      <div className='d-flex justify-content-center text-center custom-mt-1'>
        <div className='row brightVioletBoxSpellBook align-items-center'>
            <div className='col-lg-4 col-12 mb-4 mb-lg-0'>
                <GlaciusSpell />
            </div>

            <div className="col-lg-1"></div>

            <div className='col-lg-7 col-12'>
                <h3 className="text-white fw-bold">Glacius</h3>
                <p className='text-white m-0'>
                    Glacius is an ice spell that creates an icy spike or freezes the opponent, immobilizing them for a short time. 
                    It’s ideal for slowing down enemies and gaining an advantage in battle, and can also create icy obstacles. 
                    Its effectiveness depends on the caster’s skill and environmental conditions.
                </p>
                {/* Glacius to zaklęcie lodowe, które tworzy lodowy sopel lub zamraża przeciwnika, unieruchamiając go na krótki czas. Idealne do spowalniania wroga i zyskania przewagi w walce, pozwala też tworzyć lodowe przeszkody. Jego skuteczność zależy od umiejętności maga i warunków otoczenia. */}
            </div>

        </div>
      </div>

     <div className='d-flex justify-content-center text-center mt-5'>
        <div className='row brightVioletBoxSpellBook align-items-center'>
            <div className='col-lg-4 col-12 mb-4 mb-lg-0'>
                <IgnisSpell />
            </div>

            <div className="col-lg-1"></div>

            <div className='col-lg-7 col-12'>
                <h3 className="text-white fw-bold">Ignis</h3>
                <p className='text-white m-0'>
                    Ignis is a powerful fire spell that conjures an intense flame from the caster’s hand. 
                    It can be used both to attack enemies and to illuminate dark areas. 
                    Its strength depends on the caster’s experience and concentration while casting the spell.
                </p>
                {/* Ignis to potężne zaklęcie ognia, które wywołuje intensywny płomień z dłoni czarodzieja. Może służyć zarówno do ataku, rażąc przeciwników, jak i do oświetlania ciemnych miejsc. Jego siła zależy od doświadczenia maga i koncentracji podczas rzucania zaklęcia. */}
            </div>

        </div>
      </div>

     <div className='d-flex justify-content-center text-center mt-5'>
        <div className='row brightVioletBoxSpellBook align-items-center'>
            <div className='col-lg-4 col-12 mb-4 mb-lg-0'>
                <ProtegoSpell />
            </div>

            <div className="col-lg-1"></div>

            <div className='col-lg-7 col-12'>
                <h3 className="text-white fw-bold">Protego</h3>
                <p className='text-white m-0'>
                    Protego is a spell that creates a magical protective shield around the caster, deflecting incoming attacks. 
                    It provides effective defense against both spells and physical strikes. 
                    The strength of the barrier depends on the caster’s skill and concentration.
                </p>
                {/* Protego to zaklęcie tworzące magiczną tarczę ochronną, która otacza użytkownika i odbija nadchodzące ataki. Zapewnia skuteczną obronę przed zaklęciami i fizycznymi ciosami. Siła bariery zależy od umiejętności i koncentracji czarodzieja. */}
            </div>

        </div>
      </div>

           <div className='d-flex justify-content-center text-center mt-5'>
        <div className='row brightVioletBoxSpellBook align-items-center'>
            <div className='col-lg-4 col-12 mb-4 mb-lg-0'>
                <FulmenSpell />
            </div>

            <div className="col-lg-1"></div>

            <div className='col-lg-7 col-12'>
                <h3 className="text-white fw-bold">Fulmen</h3>
                <p className='text-white m-0'>
                    Fulmen is a lightning spell that strikes the opponent with a powerful bolt discharged from the wand. 
                    It can stun, incapacitate, or even knock down the target with a single hit. 
                    Its effectiveness increases in stormy weather and with a high concentration of magical energy.
                </p>
                {/* Fulmen to zaklęcie błyskawicy, które razi przeciwnika potężnym piorunem wyładowanym z różdżki. Może ogłuszyć, obezwładnić, a nawet powalić cel jednym uderzeniem. Jego skuteczność wzrasta w warunkach burzowej pogody i przy dużym skupieniu energii magicznej. */}
            </div>

        </div>
      </div>

           <div className='d-flex justify-content-center text-center mt-5'>
        <div className='row brightVioletBoxSpellBook align-items-center'>
            <div className='col-lg-4 col-12 mb-4 mb-lg-0'>
                <SilencioSpell />
            </div>

            <div className="col-lg-1"></div>

            <div className='col-lg-7 col-12'>
                <h3 className="text-white fw-bold">Silencio</h3>
                <p className='text-white m-0'>
                    Silencio is a silencing spell that blocks all sounds within a designated area. 
                    It allows for stealthy actions and prevents opponents from communicating or raising alarms. 
                    Its effectiveness depends on the caster’s power and the size of the silenced zone.
                </p>
                {/* Silencio to zaklęcie wyciszenia, które blokuje wszelkie dźwięki w wyznaczonym obszarze. Pozwala na ciche działania i uniemożliwia przeciwnikom komunikację lub alarmowanie innych. Jego efektywność zależy od siły maga i wielkości objętego ciszą pola. */}
            </div>

        </div>
      </div>

           <div className='d-flex justify-content-center text-center mt-5'>
        <div className='row brightVioletBoxSpellBook align-items-center'>
            <div className='col-lg-4 col-12 mb-4 mb-lg-0'>
                <UmbraSpell />
            </div>

            <div className="col-lg-1"></div>

            <div className='col-lg-7 col-12'>
                <h3 className="text-white fw-bold">Umbra</h3>
                <p className='text-white m-0'>
                    Umbra is a shadow spell that darkens the opponent’s field of vision by creating a dense darkness around them. 
                    It helps with escape or surprise attacks by shielding the caster from the enemy’s sight. 
                    The spell’s effectiveness depends on the caster’s skill and environmental conditions.
                </p>
                {/* Umbra to zaklęcie cienia, które zaciemnia pole widzenia przeciwników, tworząc gęsty mrok wokół nich. Ułatwia ucieczkę lub zaskakujący atak, osłaniając użytkownika przed wzrokiem wroga. Skuteczność zaklęcia zależy od umiejętności czarodzieja i warunków otoczenia. */}
            </div>

        </div>
      </div>

           <div className='d-flex justify-content-center text-center mt-5'>
        <div className='row brightVioletBoxSpellBook align-items-center'>
            <div className='col-lg-4 col-12 mb-4 mb-lg-0'>
                <AscensioSpell />
            </div>

            <div className="col-lg-1"></div>

            <div className='col-lg-7 col-12'>
                <h3 className="text-white fw-bold">Ascensio</h3>
                <p className='text-white m-0'>
                    Ascensio is a levitation spell that allows objects or people to be lifted into the air. 
                    It makes carrying heavy things easier and enables floating above the ground. 
                    The spell’s effectiveness depends on the caster’s concentration and magical strength.
                </p>
                {/* Ascensio to zaklęcie lewitacji, które pozwala unieść przedmioty lub osoby w powietrze. Ułatwia przenoszenie ciężkich rzeczy oraz daje możliwość unoszenia się nad ziemią. Skuteczność zaklęcia zależy od koncentracji i siły magicznej czarodzieja. */}
            </div>

        </div>
      </div>

           <div className='d-flex justify-content-center text-center mt-5'>
        <div className='row brightVioletBoxSpellBook align-items-center'>
            <div className='col-lg-4 col-12 mb-4 mb-lg-0'>
                <TenebraeSpell />
            </div>

            <div className="col-lg-1"></div>

            <div className='col-lg-7 col-12'>
                <h3 className="text-white fw-bold">Tenebrae</h3>
                <p className='text-white m-0'>
                    Tenebrae is a darkness spell that surrounds the opponent with a dense, mysterious fog, limiting their visibility. 
                    The fog hinders movement and disorients the target, giving the caster an advantage. 
                    Tenebrae’s effectiveness increases in dark and gloomy environments.
                </p>
                {/* Tenebrae to zaklęcie mroku, które otacza przeciwnika gęstą, tajemniczą mgłą, ograniczając jego widoczność. Mgła utrudnia ruchy i dezorientuje cel, dając przewagę użytkownikowi zaklęcia. Skuteczność Tenebrae wzrasta w ciemnych i ponurych miejscach. */}
            </div>

        </div>
      </div>

           <div className='d-flex justify-content-center text-center mt-5'>
        <div className='row brightVioletBoxSpellBook align-items-center'>
            <div className='col-lg-4 col-12 mb-4 mb-lg-0'>
                <TempestasSpell />
            </div>

            <div className="col-lg-1"></div>

            <div className='col-lg-7 col-12'>
                <h3 className="text-white fw-bold">Tempestas</h3>
                <p className='text-white m-0'>
                    Tempestas is a storm spell that summons a violent wind or powerful storm in a localized area. 
                    It can disorient opponents by knocking them down and reducing visibility. 
                    The spell’s strength depends on the caster’s experience and weather conditions.
                </p>
                {/* Tempestas to zaklęcie burzy, które wywołuje gwałtowny wiatr lub potężną burzę na ograniczonym obszarze. Może zdezorganizować przeciwników, rzucając ich na ziemię i utrudniając widoczność. Siła zaklęcia zależy od doświadczenia czarodzieja i warunków pogodowych. */}
            </div>

        </div>
      </div>

           <div className='d-flex justify-content-center text-center mt-5'>
        <div className='row brightVioletBoxSpellBook align-items-center'>
            <div className='col-lg-4 col-12 mb-4 mb-lg-0'>
                <LuxSpell />
            </div>

            <div className="col-lg-1"></div>

            <div className='col-lg-7 col-12'>
                <h3 className="text-white fw-bold">Lux</h3>
                <p className='text-white m-0'>
                    Lux is a light spell that brightens darkness and dark corners, creating a glowing aura around the caster. 
                    It’s ideal for illuminating paths or revealing hidden objects and secrets. 
                    The strength and range of the light depend on the caster’s skill and concentration.
                </p>
                {/* Lux to zaklęcie światła, które rozświetla mrok i ciemne zakamarki, tworząc jasną aurę wokół użytkownika. Idealne do oświetlania drogi lub odkrywania ukrytych przedmiotów i tajemnic. Siła i zasięg światła zależą od umiejętności czarodzieja i jego koncentracji. */}
            </div>

        </div>
      </div>

      <div className='d-flex justify-content-center text-center mt-3 mt-lg-5 mb-4'>
        <button className='buttonGetStarted text-white mt-3 mt-lg-0' onClick={() => navigate("/mainPage")}>
          BACK
        </button>
      </div>

    </div>


    </>
  );
}
export default Spellbook;