import Link from "next/link";

export function tradeShowBoothDesignPost() {
  return (
    <>
      <p>
        The floor plan PDF just landed. You find your booth number, circle
        it, and then look at the two numbers on either side of it. Both
        belong to companies with bigger budgets than yours, and someone on
        your team is already asking whether the back wall can be taller.
        That&rsquo;s the moment most people start to design a trade show
        booth, and it&rsquo;s the moment to slow down.
      </p>

      <p>You don&rsquo;t pick your neighbors.</p>

      <p>
        For three years at RSA Conference, Arxan Technologies&rsquo; booth sat
        between Palo Alto Networks and CrowdStrike, on a floor with forty
        thousand attendees and a vendor hall that takes 25 minutes to cross.
        Both neighbors spent more than we did, every single year. Every booth
        design decision I made at RSA started from that fact. Smaller vendors try to design their
        way out of that position all the time, and I think it&rsquo;s the
        wrong fight.
      </p>

      <p>
        The trade show booth design guides that rank for this mostly agree
        with each other. Use the three-second rule. Keep the message short
        and the space uncluttered, make it open and inviting, add something
        interactive, and keep your branding consistent from the back wall to
        the giveaways. I&rsquo;d sign all of it! Most of those guides are
        written by exhibit builders, though, and they design one booth for
        one show. Nobody in them is standing next to a neighbor with a much
        bigger budget, and nobody is planning to bring the same booth back
        two more times. Those two problems decided everything about the
        booths I built.
      </p>

      <h2>Why the bigger-booth fix breaks</h2>

      <p>
        What most teams try first is to close the gap with size: a taller
        wall, more screens, more copy explaining the product. It breaks for
        three reasons I watched play out on the RSA floor. A passerby gives
        your back wall about 0.6 seconds, so extra copy is never read. Extra
        structure eats the front edge where your staff need to stand. And a
        booth built to win one year gets rebuilt the next, so the floor never
        gets to recognize you.
      </p>

      <p>
        What worked instead was a sequence, and I run it in this order.
        Check the neighbors and the loading dock before anyone opens a
        design file. Cut the wall to one message that passes a 30-foot
        test. Then lay out the carpet around where people will stand, and
        build the structure to come back twice with one piece you can swap.
      </p>

      <table className="post-table">
        <caption>
          Trade show booth design choices compared: who each one fits, what
          it looks like on the floor, where it breaks, and what Arxan did at
          RSA Conference
        </caption>
        <thead>
          <tr>
            <th scope="col">Design choice</th>
            <th scope="col">Best for</th>
            <th scope="col">On the floor</th>
            <th scope="col">Where it breaks</th>
            <th scope="col">Arxan at RSA (3 years)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Out-build the neighbors (taller wall, more screens)</th>
            <td>The biggest budget on the aisle</td>
            <td>Loud, busy, lots of copy</td>
            <td>
              Next to bigger spenders it reads as trying, and the copy gets
              0.6 seconds
            </td>
            <td>Skipped it</td>
          </tr>
          <tr>
            <th scope="row">Calm booth, one anchor message</th>
            <td>A smaller vendor between loud neighbors</td>
            <td>One line, readable from 30 feet, no clutter</td>
            <td>
              Fails if the one line is vague. Test it on someone who
              hasn&rsquo;t seen the rendering
            </td>
            <td>Our core design all three years</td>
          </tr>
          <tr>
            <th scope="row">Counter or demo table at the aisle</th>
            <td>Self-serve product demos</td>
            <td>Staff behind a counter</td>
            <td>
              Puts your team behind a wall and makes the booth look like a
              private party
            </td>
            <td>
              Demo set a step back, staff in the front corners
            </td>
          </tr>
          <tr>
            <th scope="row">Brand-new booth every year</th>
            <td>A one-time show or a message that changes</td>
            <td>Fresh look each year</td>
            <td>
              Throws away recognition just as it starts paying off, and
              reopens the design budget every January
            </td>
            <td>
              Kept the structure, swapped the demo. Year Three had the
              highest pipeline contribution of the three
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Design for the Neighbors You Drew</h2>

      <p>
        The first instinct when you&rsquo;re the smaller vendor is to
        over-design: a taller back wall and another bank of screens, to make
        up visually for the budget gap. I think that&rsquo;s a trap. The
        harder a booth tries to look big, the faster a buyer clocks that
        it&rsquo;s trying, and the buyers walking the RSA floor are mostly
        CISOs and security architects who have seen every version of trying
        there is.
      </p>

      <p>
        So I went the other way. Next to two loud booths, a calm one reads
        as confident, and confidence is the one thing on that floor a budget
        can&rsquo;t buy. People who walked past Palo Alto and CrowdStrike
        stopped at Arxan because the energy was different. Before you sketch
        anything, find out who you&rsquo;re next to. If your neighbors are
        shouting, you don&rsquo;t have to.
      </p>

      <h2>One Message, Readable From 30 Feet</h2>

      <p>
        The guides say three seconds. At RSA we had about 0.6, which is
        roughly how long a person on their way to somewhere else gives your
        back wall before their eyes move on.
      </p>

      <p>
        I learned how that decision works behind the counter of{" "}
        <Link href="/blog/sunglasses-shops-and-bodywork">
          my own sunglasses shops
        </Link>{" "}
        in San Francisco, where a stranger decides in their first three steps
        whether to come in. A booth gets the same three steps, taken much
        faster, with a badge scanner pointed at them from every direction.
        We built Arxan&rsquo;s to read cleanly from 30 feet, with one anchor
        message and no clutter. One. Every extra line on the back wall
        competes with the line you actually need a CISO to read, and the
        product details can wait for a conversation, because a visitor who
        stops will ask.
      </p>

      <p>
        My test is to walk up the aisle from 30 feet out with somebody who
        has never seen the rendering, then ask them what we do. If they
        can&rsquo;t say it back, the wall gets cut, and it always loses more
        words than anyone in the design review wanted to give up.
      </p>

      <h2>Leave the Front Edge for People</h2>

      <p>
        Every guide tells you to keep the booth open. I&rsquo;d go further
        and design the front edge of the carpet around where the staff will
        stand, since that is where the stopping happens. A graphic can make
        someone slow down. Turning that pause into a conversation takes a
        person.
      </p>

      <p>
        At Arxan the booth carried part of the job and the people carried the
        rest. We staffed it with reps who could hold a 90-second technical
        conversation without reading from a card, and{" "}
        <Link href="/blog/trade-show-booth-staff-training">
          in the briefing the night before
        </Link>{" "}
        I told them where to stand: front corners, angled toward the aisle,
        never clustered behind the demo table. That only works if the design
        leaves room for it. If the demo station sits right at the aisle with
        a counter in front of it, your team ends up behind a wall, and a
        booth full of your own people huddled together looks like a private
        party. Nobody walking past wants to crash one.
      </p>

      <p>
        Put the demo a step back and leave the corners clear. And please
        design a place that isn&rsquo;t the front of the booth for the jackets,
        because otherwise by 11 a.m. there will be a pile of them on the
        nicest stool you own.
      </p>

      <h2>Hand the Fabricator the Dock Before the Rendering</h2>

      <p>
        My{" "}
        <Link href="/blog/first-venue-walkthrough">first walkthrough</Link> of
        any venue starts at the loading dock, and a booth is no different.
        The most beautiful structure in the world is still just a rendering
        if it can&rsquo;t get through the freight door. During Super Bowl
        build week at Pier 39, a damaged panel&rsquo;s replacement for the
        Tostitos activation was stuck in a truck somewhere on I-80, and the
        person who mattered right then was the fabricator&rsquo;s lead
        carpenter, the one who knew how to splice a panel (I wrote about
        that week in{" "}
        <Link href="/blog/event-vendor-management">
          how I manage event vendors
        </Link>
        ). A design that depends on one irreplaceable panel will find out
        how irreplaceable it is at the worst possible hour.
      </p>

      <p>
        I treat a booth build spec the way I treated the riders for three
        performing artists at the{" "}
        <Link href="/blog/latin-billboard-awards-artist-relations">
          Latin Billboard Awards
        </Link>
        : every line gets executed or flagged, never quietly dropped. If the
        fabricator can&rsquo;t hit a finish or a dimension, I want to hear it
        in the shop, weeks before load-in. Hearing it on the show floor is a
        crisis.
      </p>

      <p>
        Budget the boring lines while you&rsquo;re in there. Drayage and the
        booth internet are the costs nobody remembers until the invoice
        arrives, and I&rsquo;ve said as much in{" "}
        <Link href="/blog/measure-trade-show-roi">
          how I measure trade show ROI
        </Link>
        . For RSA specifically, I wrote up{" "}
        <Link href="/blog/rsa-conference-booth-design">
          how I compare RSA Conference booth quotes over three years
        </Link>
        , line by line. And before any of it, I decide how the show will be
        judged, which I wrote up as{" "}
        <Link href="/blog/measure-trade-show-success">
          how I measure trade show success
        </Link>
        .
      </p>

      <h2>Build the Booth You&rsquo;ll Want in Year Three</h2>

      <p>
        This is the opinion I&rsquo;d defend in any design review, and
        it&rsquo;s the one I couldn&rsquo;t find in a single booth design
        guide.
      </p>

      <p>
        I ran{" "}
        <Link href="/blog/anchoring-arxan-three-years-rsa">
          Arxan&rsquo;s presence at RSA for three consecutive years
        </Link>
        . In Year Three the temptation was to reinvent everything, starting
        with the booth, and we didn&rsquo;t. We tightened the booth slightly, refreshed the demo, and left the rest
        alone. Pipeline contribution that year was the highest of the three.
        By then the same CISOs had seen us in the same neighborhood with
        roughly the same message twice, and we had started to register as a
        fixture, a company that was clearly going to be there.
      </p>

      <p>
        A booth that changes completely every year throws that recognition
        away just as it starts paying off, and it puts your design budget
        back on the table every January. So when I brief a designer on a big
        annual show, I ask for a booth we&rsquo;ll be happy to see again in
        two years. That means an anchor message that will still be true in
        Year Three, built into a structure sturdy enough to ship and load in
        that many times, with one small piece we can swap out (for us it was
        the demo). Design the first year as the first of three, and give
        the floor time to get to know you. If you can&rsquo;t promise the
        second and third, I&rsquo;d buy a different{" "}
        <Link href="/blog/conference-sponsorship-package">
          line on the sponsorship prospectus
        </Link>{" "}
        this year.
      </p>

      <h2>Where each approach fits, and who should skip it</h2>

      <p>
        The calm, one-message booth fits a smaller vendor on an aisle with
        louder neighbors, selling to buyers who have seen every version of
        trying. If you are the biggest budget on the aisle, you have more
        room to build big, and the guides written by exhibit builders will
        serve you fine.
      </p>

      <p>
        Skip the build-for-Year-Three advice if this is a one-time show, if
        it&rsquo;s a launch whose message will be wrong by next year, or if
        nobody can commit budget to the same show for three years. In that
        case a reusable structure is money spent on a future you
        haven&rsquo;t bought, and a cheaper one-off build is the right call.
      </p>

      <h2>The Demo Laptop</h2>

      <p>
        It will pick the busiest hour of the show to install an update, so
        design a spot for a backup that nobody can see from the aisle.
      </p>

      <p>
        We were outspent on both sides at RSA for three straight years. The
        booth never tried to win that fight, and Year Three was still our
        best one.
      </p>

      <p>
        If you run events for a B2B company with a big annual show coming
        up and a booth that&rsquo;s starting to grow screens,{" "}
        <Link href="/#contact">let&rsquo;s talk</Link>! Every week the
        rendering sits unreviewed is a week closer to a freight-door
        surprise. I&rsquo;ll want to know who your neighbors are before I
        look at it.
      </p>
    </>
  );
}
