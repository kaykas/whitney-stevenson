import Link from "next/link";

export function rsaConferenceBoothDesignPost() {
  return (
    <>
      <p>Three quotes came back, and they&rsquo;re for three different booths.</p>

      <p>
        One exhibit house quoted a rental. One sent gorgeous renderings for a
        custom build and left out installation labor entirely. The third came
        back with a number so round you already know it will grow. All three
        are supposedly for the same 10 by 20 at Moscone Center, and you
        can&rsquo;t compare any of them. That&rsquo;s the week I&rsquo;d want
        to sit down with whoever is running RSA Conference booth design at
        your company, because the design problem is mostly settled by then and
        the money problem has barely started.
      </p>

      <div className="post-table-wrap">
        <table className="post-table">
          <caption>
            Exhibit builders for RSA Conference compared: who each fits, what
            they handle, what you still order from the show, and the trade-off
          </caption>
          <thead>
            <tr>
              <th scope="col">Builder type</th>
              <th scope="col">Best for</th>
              <th scope="col">What they handle</th>
              <th scope="col">What you still order from the show</th>
              <th scope="col">Cost over three RSAs</th>
              <th scope="col">Key trade-off</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Full-service exhibit house</th>
              <td>A team with nobody free to fill in order forms</td>
              <td>Design, build, graphics, freight, storage, often their own installation crew</td>
              <td>Usually little, but confirm drayage, electrical and internet in writing</td>
              <td>Highest Year One, lower Years Two and Three if you own the booth</td>
              <td>You pay for the coordination, and storage bills arrive all year</td>
            </tr>
            <tr>
              <th scope="row">Rental exhibit house</th>
              <td>A first RSA, or a budget decided every January</td>
              <td>Rented structure and graphics per show</td>
              <td>Often labor, drayage, electrical and internet</td>
              <td>Low each year, full price again every year</td>
              <td>Your booth may look like somebody else&rsquo;s from last month</td>
            </tr>
            <tr>
              <th scope="row">Hybrid: rental frame, custom graphics</th>
              <td>A smaller security vendor with one strong anchor message</td>
              <td>Rented frame, graphics you own and can swap</td>
              <td>Often labor, drayage, electrical and internet</td>
              <td>Low to middle; new graphics only when the message changes</td>
              <td>Limited shapes, so it reads a little standard</td>
            </tr>
            <tr>
              <th scope="row">Show-provided turnkey package, where offered</th>
              <td>A company still deciding whether RSA is its show</td>
              <td>Furniture and a sign from the show</td>
              <td>Anything beyond the package</td>
              <td>Lowest; decide again each year</td>
              <td>Next to big neighbors it disappears</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        I ran Arxan Technologies&rsquo; booth at RSA Conference for three
        consecutive years, wedged between Palo Alto Networks and CrowdStrike,
        both of whom outspent us every year. The design side (mostly one message that
        reads from 30 feet, and a structure built to come back in Year Three)
        is in{" "}
        <Link href="/blog/trade-show-booth-design">
          how I design a trade show booth next to bigger budgets
        </Link>
        . This note is the paperwork around it. RSA happens in my city, and
        I&rsquo;d rather you spend the money on the booth than on the
        surprises.
      </p>

      <h2>Why Picking an Exhibit Builder by the Renderings Breaks</h2>

      <p>
        Most teams pick the exhibit builder whose renderings look best, then
        find out what the booth costs when the show invoices land. That breaks
        because the rendering is the one part every builder prices the same
        way. The money hides in the lines a rendering never shows: installation
        hours, crated weight for drayage, outlets, and what happens to the
        booth in Year Two. What works is the same brief to every builder, a
        quote broken into the lines in the table below, and a column for each
        of three years. Then you are comparing booths, not guesses.
      </p>

      <h2>Write the Brief Before Anyone Quotes</h2>

      <p>Exhibit houses price what you ask for. Ask vaguely, get three guesses.</p>

      <p>
        My brief fits on one page. It gives the booth number off the floor plan
        and who&rsquo;s on either side of it. Then the one anchor message
        that has to survive a 30-foot walk up the aisle, written exactly as
        it will appear on the wall. It says how many reps will be on
        the carpet at the busiest hour, whether the demo needs power and a
        monitor, and where the jackets go (I&rsquo;m serious about the
        jackets). Then comes the sentence most briefs leave out: we plan to
        bring this booth back for three years, with one piece we can swap each
        year. That sentence moves the quote more than anything else on the
        page, because it tells the fabricator to price a structure that survives three
        load-ins at Moscone instead of a one-show build that gets thrown
        out on the last afternoon.
      </p>

      <p>
        Settle the booth type before you argue about height. An inline booth
        shares its back wall with the neighbors, and the standard rules most
        U.S. shows follow cap that wall at 8 feet, so the person asking
        whether the back wall can be taller usually already has an answer.
        Island booths get more height and more labor hours. Check the current
        numbers in RSA&rsquo;s exhibitor manual, and attach the whole manual
        to the brief. An exhibit house that quotes without asking you a single
        question about it hasn&rsquo;t read it.
      </p>

      <h2>Read the Trade Show Booth Design Quote Line by Line</h2>

      <p>
        The cheapest trade show booth design quote in the pile is usually the
        one with the fewest lines. Some costs belong on the exhibit
        house&rsquo;s invoice. Others are ordered from the show&rsquo;s own
        contractors, on the forms in that exhibitor manual, and a quote can
        look lean simply because it quietly left those for you.
      </p>

      <div className="post-table-wrap">
        <table className="post-table">
          <caption>
            RSA Conference booth quote, line by line: who usually bills each
            cost, what I ask, and where it goes wrong
          </caption>
          <thead>
            <tr>
              <th scope="col">Quote line</th>
              <th scope="col">Who usually bills it</th>
              <th scope="col">What I ask</th>
              <th scope="col">Where it goes wrong</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Design and renderings</th>
              <td>Exhibit house</td>
              <td>How many revision rounds, and is the fee credited if you build with them</td>
              <td>A rendering nobody checked against the show&rsquo;s height rules</td>
            </tr>
            <tr>
              <th scope="row">Structure (rental or custom)</th>
              <td>Exhibit house</td>
              <td>Own or rent, and what Year Two and Year Three cost</td>
              <td>Priced for one show, silent about the next two</td>
            </tr>
            <tr>
              <th scope="row">Graphics</th>
              <td>Exhibit house</td>
              <td>Can one panel be swapped without new frames</td>
              <td>A new message means a new wall</td>
            </tr>
            <tr>
              <th scope="row">Installation and dismantle labor</th>
              <td>Show labor or the exhibit house&rsquo;s crew, per the exhibitor manual</td>
              <td>Estimated hours, crew size, overtime rates</td>
              <td>Missing from the quote entirely</td>
            </tr>
            <tr>
              <th scope="row">Drayage (moving your freight from the dock to the booth)</th>
              <td>The show&rsquo;s general contractor, priced by weight</td>
              <td>The crated shipping weight, in writing</td>
              <td>Heavy crates nobody weighed until the invoice</td>
            </tr>
            <tr>
              <th scope="row">Electrical, rigging and internet</th>
              <td>The show&rsquo;s contractors, ordered by deadline</td>
              <td>Where every outlet goes, and whether there&rsquo;s a hanging sign</td>
              <td>A dark demo screen on opening morning</td>
            </tr>
            <tr>
              <th scope="row">Shipping and storage</th>
              <td>Exhibit house or a freight carrier</td>
              <td>Round-trip freight, monthly storage rate, repair estimate between shows</td>
              <td>The booth you own pays rent all year</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Put them in one spreadsheet, one column per exhibit house, and fill in
        the show-side lines from the order forms for every column, even the
        ones the quote ignored. Compare the bottom row. Drayage and booth
        internet are the two I see forgotten most, which is also why I read
        the{" "}
        <Link href="/blog/hotel-av-drayage-contract-clauses">
          AV and drayage clauses in hotel contracts
        </Link>{" "}
        before anybody signs.
      </p>

      <h2>Ask for the Year Three Number</h2>

      <p>This is the request I&rsquo;d fight for.</p>

      <p>
        Ask every exhibit house to quote three years, with Year Two and Year
        Three in their own columns: storage, refurbishment, the swappable
        graphic, shipping and labor, all of it. A custom booth that costs more
        up front can come out ahead by the third RSA. A rental that looks like
        a bargain in Year One gets rented again, at full price, twice. At
        Arxan we tightened the booth slightly in Year Three, refreshed the
        demo and left the rest alone, and pipeline contribution that year was
        the highest of the three. I want finance looking at that plan in the
        quote before the first deposit, so nobody reopens the booth budget in
        January.
      </p>

      <div className="post-table-wrap">
        <table className="post-table">
          <caption>
            RSA Conference booth options compared: who each fits, how it&rsquo;s
            bought, relative cost over three years, and the honest trade-off
          </caption>
          <thead>
            <tr>
              <th scope="col">Option</th>
              <th scope="col">Best for</th>
              <th scope="col">Model</th>
              <th scope="col">Year One cost</th>
              <th scope="col">Years Two and Three</th>
              <th scope="col">Key trade-off</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Show-provided turnkey package or kiosk, where offered</th>
              <td>A company still deciding whether RSA is its show</td>
              <td>The show supplies the furniture and sign</td>
              <td>Lowest</td>
              <td>Decide again each year</td>
              <td>Almost no room for design, and loud neighbors win</td>
            </tr>
            <tr>
              <th scope="row">Rental booth</th>
              <td>A first RSA, or a budget that gets decided every January</td>
              <td>Rent structure and graphics per show</td>
              <td>Low</td>
              <td>Full rental again, every year</td>
              <td>Your booth may look like somebody else&rsquo;s from last month</td>
            </tr>
            <tr>
              <th scope="row">Hybrid: rental frame, custom graphics</th>
              <td>A smaller vendor with one strong anchor message</td>
              <td>Rent the frame, own the graphics</td>
              <td>Low to middle</td>
              <td>Rental plus graphics only when the message changes</td>
              <td>Limited shapes, so it reads a little standard</td>
            </tr>
            <tr>
              <th scope="row">Custom build you own</th>
              <td>A real three-year commitment to RSA</td>
              <td>Buy it, store it between shows</td>
              <td>Highest</td>
              <td>Storage, refurbishment, labor, freight</td>
              <td>Wrong the minute you skip a year</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Where Each Option Fits (and Where It Doesn&rsquo;t)</h2>

      <p>
        Rental wins outright if you can&rsquo;t promise a second year, and I
        would pick it over a custom build every time the budget gets
        relitigated each January. The hybrid is where I&rsquo;d start a
        smaller security vendor, because Arxan&rsquo;s whole advantage came
        from one calm message and nothing about that needs custom carpentry.
        A custom build only makes sense with three years signed off. The
        turnkey package is a fine first look at the show, though next to
        neighbors like ours it would have disappeared.
      </p>

      <p>
        One concession, with my stake on the table. I&rsquo;m looking for an
        in-house events role, so I have a reason to tell you a company needs
        someone like me reading these quotes. If your team has nobody with
        the hours for it, a full-service exhibit house that handles labor,
        freight and storage end to end will beat a stretched marketing
        manager filling in order forms at midnight, and I&rsquo;d hire one.
      </p>

      <h2>Who Should Skip a Custom Exhibit Builder</h2>

      <p>
        Skip the custom build if your RSA budget gets decided again every
        January, if you can&rsquo;t say who will be on the carpet next year,
        or if nobody on your team can own the storage and refurbishment line
        between shows. A booth you own is wrong the minute you skip a year. In
        any of those cases, rent, or start with a hybrid frame and spend the
        difference on the people standing in it.
      </p>

      <h2>Booth Training Happens on the Carpet</h2>

      <p>
        Conference booth training belongs at Moscone during build, after the
        graphics go up and before the vacuums start. A 10 by 20 looks roomy
        in a rendering and much smaller with four reps and a demo screen in
        it, and nobody learns where to stand from a slide. The bar I set at
        Arxan was a rep who could hold a 90-second technical conversation
        without reading from a card, and the rest is in{" "}
        <Link href="/blog/trade-show-booth-staff-training">
          my night-before booth staff briefing
        </Link>{" "}
        and, if half the people on the carpet work for a partner,{" "}
        <Link href="/blog/exhibition-stand-staff-training">
          the version for mixed crews
        </Link>
        .
      </p>

      <h2>The Crates</h2>

      <p>
        Write the booth number on two sides of every crate yourself, in big
        marker, because the person moving it at load-in has a few hundred
        other crates to think about.
      </p>

      <p>
        If you have three RSA quotes on your desk and none of them match,{" "}
        <Link href="/#contact">let&rsquo;s talk</Link>! I&rsquo;ll want the
        floor plan and the exhibitor manual before I open a single PDF.
      </p>
    </>
  );
}
