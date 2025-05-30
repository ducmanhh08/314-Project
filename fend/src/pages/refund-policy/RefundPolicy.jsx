import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RefundPolicy.module.css';
import Navbar from '../../components/Navbar/Navbar';

const RefundPolicy = () => {
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(false);

    const handleToggle = () => {
        setShowMore(!showMore);
    };

    const reasonsLeft = [
        'Illness / Injury (including Covid)',
        'Pre-existing Medical Condition',
        'Pregnancy Complication',
        'Death of Immediate Family',
        'Public Transport Failure',
        'Flight disruption',
        'Mechanical Breakdown',
        'Adverse Weather',
    ];

    const reasonsRight = [
        'Home Emergency',
        'Theft of Documents',
        'Workplace Redundancy',
        'Jury Service',
        'Court Summons',
        'Armed Forces & Emergency Services Recall',
        'Relocated for Work',
        'Changes to Examination Dates',
    ];

    return (
        <>
        <Navbar />
            <div className={styles['refund-policy-container']}>
                <h1 className={styles['refund-policy-title']}>Refund Policy</h1>

                <p>You may be eligible to receive a refund if…</p>
                <p>
                    (Certain words in this document are <strong>in bold</strong> for clarity, and their meanings have been defined later in this document)
                </p>
                <p>
                    You <strong>cannot</strong> attend your booking due to any of the reasons listed below, and you have provided us with the evidence requested.
                </p>
                <p>The following are reasons we consider, subject to our General Conditions of Refund:</p>

                <div className={styles['two-column-list']}>
                    <ul>
                        {reasonsLeft.map((reason, index) => (
                            <li key={index}>{reason}</li>
                        ))}
                    </ul>
                    <ul>
                        {reasonsRight.map((reason, index) => (
                            <li key={index}>{reason}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles['refund-policy-details']}>
                    <p>
                        If <strong>Your Booking</strong> is cancelled or postponed by the provider, <strong>You</strong> should contact <strong>Our Customer Service</strong> team directly.
                    </p>
                    <p>
                        Please see <strong>Your Booking</strong> confirmation or our website for our contact details.
                    </p>
                    <p>
                        We may in addition to the above, consider other <strong>Emergency Circumstances</strong> at our discretion.
                    </p>
                    <p>
                        <strong>You must</strong> read the General Conditions of Refund, and the individual reasons section below to understand what we may or may not cover.
                    </p>

                    <h2>General Conditions of Refund</h2>
                    <ul>
                        <li>All refunds are considered within our discretion.</li>
                        <li>Any reason for a refund must not have been foreseeable at the time <strong>You</strong> made the <strong>Booking</strong>.</li>
                        <li>We do not refund <strong>You</strong> if <strong>You</strong> made <strong>Your Booking</strong> in error, or if it is no longer wanted or needed.</li>
                        <li>If <strong>Your Booking</strong> is cancelled, postponed and/or cannot be fulfilled by the <strong>Provider</strong>, please contact our Customer Service team directly for further advice about your Refund.</li>
                        <li><strong>You</strong> must make all arrangements to <strong>Attend</strong> the <strong>Booking</strong>, including arranging any necessary travel or documents, and allowing suitable travel time.</li>
                        <li>We don’t refund <strong>You</strong> where <strong>You</strong> are worried about catching Covid or where <strong>Your</strong> travel plans are affected by Covid restrictions.</li>
                        <li>We may ask for any reasonable additional evidence required to support your application, which may include proof of eligibility and intent to <strong>Attend</strong>.</li>
                        <li><strong>You</strong> will be asked to provide supporting evidence at <strong>Your</strong> own expense, and a copy of the <strong>Booking Confirmation</strong>.</li>
                        <li><strong>You</strong> will be asked to provide <strong>Your</strong> bank account details so that we can make the refund payment directly to <strong>Your</strong> chosen bank account.</li>
                        <li>Please note that there is a maximum refund value per transaction, and we will not refund <strong>You</strong> for an amount which exceeds $15,000 (fifteen thousand US Dollars) or local currency equivalent.</li>
                        <li>Should <strong>Your</strong> refund application be rejected due to <strong>You</strong> advancing the wrong reason for refund, we may, in our discretion, consider any subsequent refund application submitted in respect of the same <strong>Booking</strong>.</li>
                    </ul>

                    <h2>Requesting a Refund</h2>
                    <p>
                        To apply for a Refund, simply click on the link in the Refundable Tickets section of your booking confirmation email, or <a href="#">click here</a> and insert your OrderID found within the Refundable Tickets section of your booking confirmation email.
                    </p>

                </div>
                <div className={styles['policy-images']}>
                    <img src="/images/refund/illness_policy.png" alt="Illness" />
                    <img src="/images/refund/medical_policy.png" alt="Medical" />
                    <img src="/images/refund/pregnancy_policy.png" alt="Pregnancy" />
                    <img src="/images/refund/workplace_policy.png" alt="Workplace" />
                    <img src="/images/refund/jury_policy.png" alt="Jury" />
                </div>

                <h2>Exclusions</h2>
                <p><strong>Exclusions (reasons for which we do not refund You)</strong></p>
                <p>We do not refund for non-attendance of a <strong>Booking</strong> directly or indirectly associated with any of the following:</p>
                <ul>
                    <li>Communicable Disease;</li>
                    <li>Any actual or perceived wildfires, volcano eruptions, tsunamis, earthquakes, war, hostilities, terrorism, civil commotion, strikes and industrial action, imprisonment, repatriation, deportation, poisonous biological materials, radioactivity, Cyber Incident or Cyber Act, or state property seizure.</li>
                    <li>Naturalisation, visa, in-vitro fertilisation, or any other appointments.</li>
                    <li>Failing to comply with any law.</li>
                    <li>Any <strong>Booking</strong> emanating from China, Cuba, Iran, North Korea, Russia, Sudan and/or Syria (this list may be amended and/or supplemented from time to time).</li>
                    <li>Where exposed to any sanction, prohibition or restriction under United Nations resolutions or the trade or economic sanctions, laws or regulations of the European Union, United Kingdom or United States of America.</li>
                    <li>Where there is another <strong>Paying Party</strong>.</li>
                    <li>If it exceeds 18 (eighteen) months from the date originally booked to the conclusion of the transacted event.</li>
                </ul>

                <h2>Definitions</h2>
                <p><strong>The following words or phrases have the meaning as set out below wherever they appear in bold in this document:</strong></p>
                <ul>
                    <li><strong>We/Us/Our/Ours</strong>: means the Party responsible for the refund and refers to the <strong>Booking</strong> agent with whom <strong>You</strong> have made the <strong>Booking</strong> and/or the authorised third party who administers the refund.</li>
                    <li><strong>You/Your/Yourself</strong>: means the person who has made a <strong>Booking</strong> alone or as part of a group with <strong>Us</strong>.</li>
                    <li><strong>Armed Forces</strong>: means any Naval Service, Marine, Army or Air Force.</li>
                    <li><strong>Attend</strong>: means to participate in, take part in, use, and/or be present at.</li>
                    <li><strong>Booking</strong>: means the pre-planned and pre-booked service(s)/event(s)/flight(s)/ticket(s) transacted with <strong>Us</strong> by <strong>You</strong>.</li>
                    <li><strong>Communicable Disease</strong>: means any disease capable of being transmitted from an infected person or species to a susceptible host, either directly or indirectly, that has been designated an emergency by any health authority.</li>
                    <li><strong>Doctor</strong>: means a qualified medical practitioner registered and licensed with a recognised professional body. A doctor cannot be <strong>You</strong> or a member of <strong>Your</strong> family.</li>
                    <li><strong>Emergency Services</strong>: means Police, Fire and Rescue Services or other Emergency Services.</li>
                    <li><strong>Group</strong>: means any person that is due to <strong>Attend</strong> the <strong>Booking</strong>.</li>
                    <li><strong>Immediate Family Member</strong>: means <strong>Your</strong> husband, wife, partner, parent, child, sibling, grandparent, or stepfamily.</li>
                    <li><strong>Immediate Household</strong>: means all people living in the same family unit, not necessarily blood-related, who have a reciprocal, natural, and/or moral duty to, and do, provide support for one another. This does not include persons merely sharing the same general quarters, such as tenants, occupiers, and/or friends.</li>
                    <li><strong>Paying Party</strong>: means any organisation or body who has a legal liability to pay compensation for the failure of the service, against whom <strong>You</strong> have a right of refund.</li>
                    <li><strong>Provider</strong>: means the company or organisation that is responsible for the running of the <strong>Booking</strong>.</li>
                </ul>

                <h3>IMPORTANT</h3>
                <p>
                    This document’s translation from English to another language is only for assistance and information purposes. In the event of a refund application, the English-language version shall be the basis of any settlement.
                </p>
                <p>
                    Any reasons and/or supporting documentation submitted by <strong>You</strong> in support of a refund application is considered by <strong>Us</strong> on an entirely discretionary basis.
                </p>
                <p>
                    <strong>We</strong> are not an insurance provider, and this is not an insurance policy. Refunds are therefore not guaranteed.
                </p>
                <p>
                    A Refundable Booking is an optional extension to <strong>Our</strong> standard Terms & Conditions of sale and trade, in terms of which <strong>You</strong> are eligible to receive a refund for certain, defined circumstances as outlined in this document.
                </p>

                <button className={styles['accept-button']} onClick={() => navigate(-1)}>
                    Accept the Refund Policy
                </button>
            </div>
        </>
    );
};


export default RefundPolicy;