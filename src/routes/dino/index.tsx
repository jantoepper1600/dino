import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";

export default component$(() => {

  const state = useSignal(0);
  const initial = useSignal(true);

  const addActive = $((id: string) => {
    document.getElementById('ovrly')?.classList.add('active');
    document.getElementById(id)?.classList.add('active');
  })

  const removeActive = $(() => {
    document.getElementById('ovrly')?.classList.remove('active');
    document.getElementsByClassName('popup')[0].getElementsByClassName('active')[0].classList.remove('active');
  });

  useVisibleTask$(() => {
    setTimeout(() => initial.value = false, 100)
  });

  return (
    <main class={['bg-blue', state.value == 1 && 'bg-red']}>
      <div onClick$={removeActive} id="ovrly"></div>
      <nav>
        <button onClick$={ () => {state.value = 0} } class={ state.value == 0 && 'active' }>Erdmittelalter</button>
        <button onClick$={ () => {state.value = 1} } class={ state.value == 1 && 'active' }>Aussterben</button>
        <button onClick$={ () => {state.value = 2} } class={ state.value == 2 && 'active' }>Heute</button>
      </nav>
      <div class="img">
        <div class="berge">
          <img class={['fadeIn', 'nine', !initial.value && 'active']} style={{ bottom: '0', left: '50%' }} src="/dino/berge/berg4.svg" width={1250} />
          <img class={['fadeIn', 'eight', !initial.value && 'active']} style={{ bottom: '12.5rem', left: '-12.5%' }} src="/dino/berge/berg3.svg" width={1250} />
          <img class={['fadeIn', 'seven', !initial.value && 'active']} style={{ bottom: '7.5rem', left: '-15%' }} src="/dino/berge/berg2.svg" width={1250} />
          <img class={['fadeIn', 'six', !initial.value && 'active']} style={{ bottom: '12rem', left: '30%' }} src="/dino/berge/berg.svg" width={1250} />
        </div>
        <div class="hügel">
          <img class={['fadeIn', 'five', !initial.value && 'active']} style={{ bottom: '11rem' }} src="/dino/huegel/huegel2.svg" height={250} />
          <img class={['fadeIn', 'four', !initial.value && 'active']} style={{ bottom: '15rem' }} src="/dino/huegel/huegel.svg" height={200} />
          <img class={['fadeIn', 'five', state.value == 1 && 'active']} style={{ bottom: '11rem' }} src="/dino/phase2/huegel/huegel2.svg" height={250} />
          <img class={['fadeIn', 'four', state.value == 1 && 'active']} style={{ bottom: '15rem' }} src="/dino/phase2/huegel/huegel.svg" height={200} />
        </div>
        <div class="boden">
          <img class={['fadeIn', 'three', !initial.value && 'active']} style={{ bottom: '5rem' }} src="/dino/boden/boden3.svg" height={300} />
          <img class={['fadeIn', 'two', !initial.value && 'active']} style={{ bottom: '3rem' }} src="/dino/boden/boden2.svg" height={275} />
          <img class={['fadeIn', 'one', !initial.value && 'active']} style={{ bottom: '0' }} src="/dino/boden/boden.svg" height={175} />
          <img class={['fadeIn', 'three', state.value == 1 && 'active']} style={{ bottom: '5rem' }} src="/dino/phase2/boden/boden3.svg" height={300} />
          <img class={['fadeIn',  'two', state.value == 1 && 'active']} style={{ bottom: '3rem' }} src="/dino/phase2/boden/boden2.svg" height={275} />
          <img class={['fadeIn', 'one', state.value == 1 && 'active']} style={{ bottom: '0' }} src="/dino/phase2/boden/boden.svg" height={175} />
        </div>
        <div class="bäume">
          <img class={['popIn', 'one', !initial.value && state.value != 1 && 'active']} style={{ bottom: '17.5rem', left: '15%' }} src="/dino/baum.svg" height={300} />
          <img class={['popIn', 'two', 'mirror', !initial.value && state.value != 1 && 'active']} style={{ bottom: '21.25rem', left: '75%' }} src="/dino/baum.svg" height={200} />
          <img class={['popIn', 'two', state.value == 1 && 'active']} style={{ bottom: '17.5rem', left: '20.5%' }} src="/dino/phase2/baumstumpf.svg" width={75} />
        </div>
        <div class="content">
          <img class={['special', 'one', !initial.value && state.value == 0 && 'active']} style={{ bottom: '12.5rem', left: '35%' }} src="/dino/t-rex.svg" height={400} />
          <img class={['special', 'one', state.value == 2 && 'active']} style={{ bottom: '13.25rem', left: '40%' }} src="/dino/phase3/skelett.svg" width={150} />
          <img class={['special', 'two', state.value == 2 && 'active']} style={{ bottom: '14rem', left: '47.5%' }} src="/dino/phase3/typ.svg" width={250} />
        </div>
        <div class="pflanzen">
          <img class={['rotateIn', 'one', !initial.value && state.value != 1 && 'active']} style={{ bottom: '-2.5rem', left: '25%' }} src="/dino/pflanze/Pflanze.svg" height={300} />
          <img class={['rotateIn', 'two', !initial.value && state.value != 1 && 'active']} style={{ bottom: '-4rem', left: '47.5%' }} src="/dino/pflanze/Pflanze.svg" height={300} />
          <img class={['rotateIn', 'one', 'mirror', !initial.value && state.value != 1 && 'active']} style={{ bottom: '-6rem', left: '35%' }} src="/dino/pflanze/Pflanze.svg" height={300} />
          <img class={['rotateIn', 'three', !initial.value && state.value != 1 && 'active']} style={{ bottom: '-9rem', left: '55%' }} src="/dino/pflanze/Pflanze.svg" height={300} />
          <img class={['rotateIn', 'two', 'mirror', !initial.value && state.value != 1 && 'active']} style={{ bottom: '-8rem', left: '67.5%' }} src="/dino/pflanze/Pflanze.svg" height={300} />
          <img class={['rotateIn', 'two', 'mirror', !initial.value && state.value == 0 && 'active']} style={{ bottom: '-10rem', left: '20%' }} src="/dino/pflanze/Pflanze2.svg" height={300} />
          <img class={['rotateIn', 'three', !initial.value && state.value == 0 && 'active']} style={{ bottom: '-6rem', left: '30%' }} src="/dino/pflanze/Pflanze2.svg" height={300} />
          <img class={['rotateIn', 'two', 'mirror', !initial.value && state.value == 0 && 'active']} style={{ bottom: '-9rem', left: '42.5%' }} src="/dino/pflanze/Pflanze2.svg" height={300} />
          <img class={['rotateIn', 'one', !initial.value && state.value == 0 && 'active']} style={{ bottom: '-5rem', left: '60%' }} src="/dino/pflanze/Pflanze2.svg" height={300} />
          <img class={['rotateIn', 'three', !initial.value && state.value == 0 && 'active']} style={{ bottom: '-7rem', left: '75%' }} src="/dino/pflanze/Pflanze2.svg" height={300} />
        </div>
        <div class="felsen">
          <img class={['slideIn', 'two', !initial.value && state.value == 0 && 'active']} style={{ bottom: '-5px', right: '3rem' }} src="/dino/fels/Fels2-rechts.svg" width={400} />
          <img class={['slideIn', 'one', !initial.value && state.value == 0 && 'active']} style={{ bottom: '0' , right: '-3.5rem'}} src="/dino/fels/Fels-rechts.svg" height={600} />
          <img class={['slideIn2', 'two', !initial.value && state.value != 1 && 'active']} style={{ bottom: '-5px', left: '3em' }} src="/dino/fels/Fels2-links.svg" width={400} />
          <img class={['slideIn2', 'one', !initial.value && state.value != 1 && 'active']} style={{ bottom: '0', left: '-6rem' }} src="/dino/fels/Fels-links.svg" width={400} />
        </div>
        <div class="bullets">
          <button onClick$={ () => addActive(`phase${state.value + 1}-dino`) }></button>
          <button onClick$={ () => addActive(`phase${state.value + 1}-spezies`) }></button>
          <button onClick$={ () => addActive(`phase${state.value + 1}-flora`) }></button>
        </div>
        <div class="popup">
          <div id="phase1-dino" class="dino">
            <div class="left">
              <div class="legend">
                <h3>Verhältnis der Zeitalter</h3>
                <p>Legende:</p>
                <ul>
                  <li>Zeitalter der Dinosaurier</li>
                  <li>Auslöschung</li>
                  <li>Heute</li>
                </ul>
              </div>
              <div class="chart"></div>
            </div>
            <p>Das Zeitalter der Dinsaurier begann vor <strong>245 Millionen Jahren</strong> und hielt <strong>180 Millionen Jahre</strong> an.<br />
              In dieser Zeit entwickelten sich komplexe Lebensformen und es entstanden viele verschiedene Spezien im Meer, auf dem Land und in der Luft.
            </p>
          </div>
          <div id="phase2-dino" class="dino">
            <div class="left">
              <div class="legend">
                <h3>Verhältnis der Zeitalter</h3>
                <p>Legende:</p>
                <ul>
                  <li>Zeitalter der Dinosaurier</li>
                  <li>Auslöschung</li>
                  <li>Heute</li>
                </ul>
              </div>
              <div class="chart"></div>
            </div>
            <p>Vor <strong>65 Millionen Jahren</strong> schlug ein Asteroid auf die Erde ein und löste eine Kettenreaktion von Vulkanausbrüchen aus, die den Himmel mit schwarzen Wolken bedeckten.<br /><br />
            Das hatte zur Folge, dass das Sonnenlicht von der Wolckendecke blockiert wurde und in Kombination mit den Vulkanausbrüchen das globale Klima drastisch veränderte.<br />
            Es starben nahezu alle Dinosaurier aus und man spircht von der Auslöschung, bzw dem Massensterben der Dinosaurier.</p>
          </div>
          <div id="phase3-dino" class="dino">
            <div class="left">
              <div class="legend">
                <h3>Verhältnis der Zeitalter</h3>
                <p>Legende:</p>
                <ul>
                  <li>Zeitalter der Dinosaurier</li>
                  <li>Auslöschung</li>
                  <li>Heute</li>
                </ul>
              </div>
              <div class="chart"></div>
            </div>
            <p>Wir Menschen, die Homo sapiens, existieren seit <strong>ca. 300.000 Jahren</strong>.<br />
            Damit haben wir im Vergleich mit Abstand das jüngste und kürzeste Zeitalter.<br /><br />
            Trotzdem haben wir es geschafft uns in kurzer Zeit exponentiell zu einer hohen und komplexen Lebensform weiterzuentwickeln.</p>
          </div>
          <div id="phase1-spezies" class="spezies">
            <div class="left">
              <div class="legend">
                <h3>Verhältnis der Spezienkategorien</h3>
                <p>Legende</p>
                <ul>
                  <li>Entdeckte Dinosaurierarten</li>
                  <li>Unentdeckte Arten</li>
                  <li>Entdeckte Tierarten</li>
                </ul>
              </div>
              <div class="bar">
                <hr />
                <hr />
                <hr />
              </div>
            </div>
            <p>Es wurden bislang nur <strong>700 verschiedene Dinosaurierspezien</strong> entdeckt und es wird davon ausgegangen, dass es noch weit mehr Dinosaurierspezien gibt.<br />
            Das liegt daran, dass Fossilien schwer zu entdecken sind und tief unter der Erde liegen.</p>
          </div>
          <div id="phase2-spezies" class="spezies">
            <div class="left">
              <div class="legend">
                <h3>Verhältnis der Spezienkategorien</h3>
                <p>Legende</p>
                <ul>
                  <li>Entdeckte Dinosaurierarten</li>
                  <li>Unentdeckte Arten</li>
                  <li>Entdeckte Tierarten</li>
                </ul>
              </div>
              <div class="bar">
                <hr />
                <hr />
                <hr />
              </div>
            </div>
            <p>Experten schätzen, dass es insgesamt <strong>15 Millionen verschiedenen Arten</strong> in den <strong>245 Millionen Jahren</strong> existiert haben.<br />
            Davon sind bis heute fast alle unentdeckt und es werden täglich neue Arten entdeckt.</p>
          </div>
          <div id="phase3-spezies" class="spezies">
            <div class="left">
              <div class="legend">
                <h3>Verhältnis der Spezienkategorien</h3>
                <p>Legende</p>
                <ul>
                  <li>Entdeckte Dinosaurierarten</li>
                  <li>Unentdeckte Arten</li>
                  <li>Entdeckte Tierarten</li>
                </ul>
              </div>
              <div class="bar">
                <hr />
                <hr />
                <hr />
              </div>
            </div>
            <p>Unter unserer heutigen Tierwelt gibt es um die <strong>1,8 Millionen verschiedene entdeckte Arten</strong>.<br />
            Davon sind die meisten Tiere auf dem Land entdeckt worden und die wenigsten im Meer.<br /><br />
            Hier gilt bei den Meerestieren der selbe Grund, wie bei der Entdeckung der Dinosaurier.<br />
            Es ist für uns Menschen schwer neue Meerestiere zu entdecken, durch die erschwerten Bedienungen ab einer bestimmten Meerestiefe.</p>
          </div>
          <div id="phase1-flora" class="flora">
            <p>Zu der Flora im Dinosaurierzeitalter ist leider wenig bekannt.<br />
            Das liegt daran, dass Pflanzen im Gegensatz zu den Dinosaurier keine Knochen besitzen, die durch die Versteinerung für uns Menschen erhalten bleiben.
            Es gibt nur wenige Funde, doch man konnte feststellen, dass die damalige Flora unserer heutigen Flora recht ähnlich war.<br />
            So wuchsen damals schon verschiendene Baumfarnarten in den Wäldern der Dinosaurier.</p>
          </div>
          <div id="phase2-flora" class="flora">
            <p>Durch die globale Verwüstungung des Asteroiden, starb sowohl die Flora und Fauna.<br />
            Es gab kein Sonnenlicht und die Erde kühlte nach mit der Zeit immer weiter ab.<br />
            Es dauerte um die <strong>25 Millionen Jahre</strong> bis neue Ökosysteme entstehen konnten.</p>
          </div>
          <div id="phase3-flora" class="flora">
            <p>Heutzutage haben sich die Flora und Fauna wieder erholt und es sind viele verschiedene Ökosysteme auf den gesamten Planeten entstanden.</p>
          </div>
        </div>
      </div>
    </main>
  );
});