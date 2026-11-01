import Link from "next/link";

export function freeEventNoShowsPost() {
  return (
    <>
      <p>
        Free events lie to you in the registration count. Somebody clicks
        &ldquo;yes&rdquo; on a Tuesday in October because the invite looked
        nice and the date was far away, and by the night itself they&rsquo;ve
        forgotten they ever said it.
      </p>

      <p>The caterer still bills you for the plate.</p>

      <p>
        The guides that rank for reducing event no-shows agree on the size of
        the problem. More than 40% of registrants skip a free in-person
        event, they say, against 3 to 5% for a paid one, and half or more of
        webinar sign-ups never log on. I believe the ranges. Where I part
        ways with most of them is the fix, because their list is usually
        reminder emails, and a reminder email is the cheapest, weakest thing
        you can send someone who has already half decided to stay home.
      </p>

      <h2>Plan the Room for the People Who Come</h2>

      <p>
        Before I touch a reminder cadence, I set two numbers. One is the
        headcount I&rsquo;ll guarantee to the venue. The other is the number
        I&rsquo;ll let register, and it&rsquo;s higher on purpose. For a free
        evening event in San Francisco with an invite list I built myself,
        I&rsquo;d guarantee food for about two thirds of the RSVPs and keep
        the room small enough that two thirds still looks full. That&rsquo;s
        a call I make with the{" "}
        <Link href="/blog/first-venue-walkthrough">
          venue on the first walkthrough
        </Link>
        , while I can still ask what the guarantee deadline is and how far
        the kitchen will flex on the night.
      </p>

      <p>
        A half-empty room at 6:45 does more damage than any no-show rate. The
        people who did come walk in, see the gaps, and quietly decide this
        wasn&rsquo;t the place to be.
      </p>

      <h2>What Each Fix Actually Does to Attendance</h2>

      <div className="post-table-wrap">
        <table className="post-table">
          <caption>
            Ways to reduce no-shows at a free B2B event compared: what each
            one is best for, the effort, when it happens, and the trade-off
          </caption>
          <thead>
            <tr>
              <th scope="col">Fix</th>
              <th scope="col">Best for</th>
              <th scope="col">Effort</th>
              <th scope="col">When</th>
              <th scope="col">Trade-off</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Automated reminder emails</th>
              <td>Webinars and big open-registration events</td>
              <td>Lowest</td>
              <td>A week out, the day before, the morning of</td>
              <td>Easy to ignore, and everyone else sends them too</td>
            </tr>
            <tr>
              <th scope="row">Overbook against the venue guarantee</th>
              <td>Any free in-person event</td>
              <td>Low, once you know your show rate</td>
              <td>When you sign the venue</td>
              <td>
                The one night everyone shows up, you&rsquo;re short on
                chairs
              </td>
            </tr>
            <tr>
              <th scope="row">A question on the registration form</th>
              <td>Filtering out casual sign-ups early</td>
              <td>Low</td>
              <td>At sign-up</td>
              <td>Fewer registrations, which scares whoever reports them</td>
            </tr>
            <tr>
              <th scope="row">A waitlist</th>
              <td>Small rooms with more demand than seats</td>
              <td>Mid</td>
              <td>From the day the room fills</td>
              <td>
                Somebody has to release seats by hand the last 48 hours
              </td>
            </tr>
            <tr>
              <th scope="row">A personal note or call from the account rep</th>
              <td>Customer dinners and executive roundtables</td>
              <td>Highest per guest</td>
              <td>Two or three days out</td>
              <td>Only works if the rep actually knows the guest</td>
            </tr>
            <tr>
              <th scope="row">Charging a small fee or deposit</th>
              <td>Workshops and multi-day programs</td>
              <td>Mid, plus a payment tool</td>
              <td>At sign-up</td>
              <td>
                Reads strange on an invite to a customer you already sell to
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Where Each One Fits (and Where It Doesn&rsquo;t)</h2>

      <p>
        <strong>Reminder emails earn their place on webinars,</strong> and
        I&rsquo;ll concede the other camp wins there. With hundreds of
        strangers registered, nobody is calling anyone, and a reminder with
        the join link the morning of is the whole job. For an in-person
        dinner they do almost nothing alone.
      </p>

      <p>
        <strong>Overbooking is the one I&rsquo;d never skip.</strong> It
        costs nothing up front. It only fails when you guess the rate from
        somebody else&rsquo;s blog post (this one included) instead of your
        own last three events, so track the show rate on every event and
        put it in the{" "}
        <Link href="/blog/event-post-mortem">post-mortem</Link>. By year
        three you have a real number.
      </p>

      <p>
        <strong>The rep&rsquo;s note beats everything else</strong> for the
        small rooms that matter most. When a{" "}
        <Link href="/blog/conference-customer-dinner">
          customer dinner during conference week
        </Link>{" "}
        has twenty seats, the reminder I trust is a two-line text from the
        person who invited them, sent two days out, that mentions something
        real. &ldquo;Saving you a seat next to Priya, she has the same
        migration headache you do.&rdquo; A guest who knows someone noticed
        they&rsquo;re coming tends to come.
      </p>

      <p>
        <strong>The deposit is the one I&rsquo;d argue against</strong> for
        most B2B events. It works on strangers. On your own customers it
        tells them you expected them to flake, and that&rsquo;s a strange
        note to open a relationship evening on.
      </p>

      <h2>Golf Taught Me About Empty Chairs</h2>

      <p>
        I produced{" "}
        <Link href="/blog/presidio-golf-300-tournaments">
          300+ tournaments at Presidio Golf Course
        </Link>
        , and a no-show there leaves you with a threesome on the first tee
        and a horn that goes off on time either way. The fix I&rsquo;d reach for is a short list of players
        happy to get a call at 7am and fill a spot. That&rsquo;s a waitlist. Corporate
        events forget they&rsquo;re allowed to have one, and the same
        habit belongs on the{" "}
        <Link href="/blog/b2b-client-golf-outing">
          pairings sheet for a client golf outing
        </Link>
        .
      </p>

      <h2>Count It Honestly</h2>

      <p>Registrations are a vanity number.</p>

      <p>
        The recap slide should show who walked in and what happened with
        their accounts afterward, the same way
        I{" "}
        <Link href="/blog/measure-trade-show-roi">
          measure trade show ROI
        </Link>{" "}
        ninety days out instead of on the night. If 140 people registered
        and 82 came, put 82 on the slide, and put the 58 in a follow-up
        email with the recording or a photo of the room and a line saying
        you missed them. Some of those 58 will say yes next time, and
        they&rsquo;ll actually mean it.
      </p>

      <p>
        If you&rsquo;re staring at a registration count for a December event
        right now and doing the math on the catering order,{" "}
        <Link href="/#contact">come talk to me</Link>! I&rsquo;m looking for
        an in-house events team, and I have opinions about guarantee
        deadlines.
      </p>
    </>
  );
}
