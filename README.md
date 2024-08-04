![Ripe Slogan](readme/ripe.png)

Ripe is the tool to empower your organization with seamless, anonymous, and secure voting on critical decisions. Our platform leverages MACI (Minimal Anti-Collusion Infrastructure) from PSE Team to protect voter privacy and ensure tamper-proof results, all within a user-friendly environment where discussions and proposals come to life.

## Workflow
As a user, you can create and manage multiple organizations, each with its own discussions. Within these discussions, you can invite specific participants with an authorized email domain to vote on different proposals. The voting is conducted anonymously and securely using MACI, which protects both the integrity of the vote and the identity of the voter.

## The MVP
For the MVP, we've successfully developed the core voting workflow. The features for creating organizations and initiating new discussions are planned for version 1.5. After all, 36 hours isn’t a lot of time!

## Key Features
- Organizations: Create and manage organizations to handle discussions and voting.
- Discussions: Within each organization, you can create discussions where proposals are presented for voting.
- Participant Invitations: Invite participants with specific email domains to join discussions and vote.
- Anonymous Voting: Voting is done using MACI, ensuring that the process is both anonymous and secure.
- Identity Verification: We use JSON Web Signatures (JWS) through thirdweb to verify users' identities upon registration.
- Autonomous Wallets: Implemented account abstraction to create wallets via atr-as, facilitating user participation.
```mermaid
graph LR
    subgraph User Interaction
        A[User] --> B[Identity Verification via thirdweb]
        B --> C[Account Creation]
    end

    subgraph Organization Management
        C --> D[Create and Manage Organizations]
        D --> E[Start Discussions]
        E --> F[Invite Participants with Specific Email Domains]
    end

    subgraph Voting Process
        F --> G[Vote on Proposals]
        G --> H[MACI for Anonymous Voting]
        H --> I[Protection of Vote Integrity and Voter Identity]
    end

    style A fill:#B6CDEC,stroke:#222133,stroke-width:2px,rx:15,ry:15,color:#222133
    style B fill:#B6CDEC,stroke:#222133,stroke-width:2px,rx:15,ry:15,color:#222133
    style C fill:#B6CDEC,stroke:#222133,stroke-width:2px,rx:15,ry:15,color:#222133
    style D fill:#B6CDEC,stroke:#222133,stroke-width:2px,rx:15,ry:15,color:#222133
    style E fill:#B6CDEC,stroke:#222133,stroke-width:2px,rx:15,ry:15,color:#222133
    style F fill:#B6CDEC,stroke:#222133,stroke-width:2px,rx:15,ry:15,color:#222133
    style G fill:#B6CDEC,stroke:#222133,stroke-width:2px,rx:15,ry:15,color:#222133
    style H fill:#B6CDEC,stroke:#222133,stroke-width:2px,rx:15,ry:15,color:#222133
    style I fill:#B6CDEC,stroke:#222133,stroke-width:2px,rx:15,ry:15,color:#222133

```

## Technologies Used

- Minimal Anti-Collusion Infrastructure (MACI): MACI is the core protocol that secures the voting process. It employs cryptographic techniques, smart contracts, and zero-knowledge proofs to maintain voter privacy and ensure that votes are resistant to manipulation or external pressure.

- Ethereum Attestation Service (EAS): These attestations verify and validate actions within the ecosystem, ensuring the integrity and transparency of the voting process.

- Account Abstraction via thirdweb: We use thirdweb for account abstraction, simplifying wallet management and ensuring a seamless user experience. So your aunt Lilly can vote with her co-workers where the budget goes!

- Deployment on Scroll Sepolia: The platform is deployed on Scroll Sepolia.

## Team

<p align="center">
    <a href="https://x.com/santi_nihany">
        <img src="/readme/santi.png" alt="Alt Text 2" width="100" height="100" style="margin-right: 10px;>
    </a>
     <a href="https://x.com/luzalbaposse">
        <img src="/readme/luz.png" alt="Alt Text 1" width="100" height="100" style="margin-right: 10px;>
    </a>
    <a href="https://x.com/PatojPeralta">
        <img src="/readme/pato.png" alt="Alt Text 3" width="100" height="100">
    </a>
</p>

## Why Ripe is a Great Use of MACI

Ripe embodies the ideal use case for MACI by addressing critical challenges in secure, anonymous voting within organizations. Our platform is integrated, from frontend to backend, and deployed on Scroll Sepolia, ensuring that it is both functional and accessible.

#### Solving a Significant Problem
By leveraging MACI, Ripe provides a robust solution that ensures votes remain anonymous and secure, addressing a significant need in both decentralized and traditional voting contexts. Meanwhile, it tries to achieve a friendly UX.

#### Full Integration and Functionality
Our platform is a proof of concept, that aims to be fully functional platform that integrates MACI seamlessly across both the frontend and backend in the short-term. The entire voting workflow—from creating organizations and discussions to inviting participants and casting votes—has been meticulously designed, and the voting has been implemented.

#### Innovative Use of Technology
Ripe brings innovation to the table with its email domain verification feature, which leverages institutional affiliation as a gatekeeper within the voting protocol. This functionality allows organizations to restrict voting access to specific email domains, ensuring that only verified members of an institution can participate in the voting process.

This feature not only adds an additional layer of security but also introduces a novel way of integrating MACI with existing organizational structures -traditional ones-. By using email verification as a gatekeeping mechanism, Ripe enhances the trustworthiness and relevance of the voting process, ensuring that the right stakeholders are involved in decision-making. This approach can be extended to serve as a broader gatekeeping tool in the protocol, controlling access to sensitive voting and governance decisions based on institutional affiliation or other criteria.

## Contranct Addresses Deployed on Scroll Sepolia
- ConstantInitialVoiceCreditProxy: 0xC413538578345f60Db652Cd386622Bc80bDb929B
- EASGatekeeper: 0x858666eB9c78F8846Cab53e784867D9087f001ca
- Verifier: 0x6632586B141265CE7dd56e652a420B4288Da9aC3
- TopupCredit: 0x91a9CAC596B52e7AfA86087cdB195C0e3A01d8bb
- PoseidonT3: 0xC03E6A9d17cA60244Ae2bE08De3F8d6FcafdE04E
- PoseidonT4: 0xd955d2437337134224Bc4EbC9016EBb8D5995156
- PoseidonT5: 0x790bfA011aB2eD3dF96B8f6177D65fEA4C1D8F25
- PoseidonT6: 0x5EC80820A774280Bdf21f471D373FC89C9A88C78
- PollFactory: 0x1D6a5597303fff2B50300521dcc87ab347fcA0AF
- MessageProcessorFactory: 0x402767Ba2C09729EE2b512ec114eE925cDc7DE71
- TallyFactory: 0x4a77BC9C502920588cFD94f56a643732700907F4
- MACI: 0xf64B3fB7619f7855A4457c3bfbEEf663cA50aa7f
- AccQueueQuinaryBlankSl: 0x0fa43A0Cb85698F8D7Da5A784CF67FcD054E0B1F
- VkRegistry: 0xDcc99dc6E24E6A1Bf4D3BFb8cfa189A83B54D65f
- Poll-poll-0: 0xb7C0748cc64E59C3cdB2dDd2E046D04E17c49A36
- MessageProcessor-poll-0: 0x89CB9Cfe54BE6bC423F219898014E98F11BFEc2d
- Tally-poll-0: 0x961C767eF2032F156A54185400193360C78E5DeF
- AccQueueQuinaryMaci-poll-0: 0x68d0C93a7b78bBd1CDc66bF4896Ac98780Bbe14f
  
## Credits 

We used MACI-RPGF as a starting point for our project.
Special thanks to Sam Richards and Cris Garner for their invaluable help in implementing MACI <3
And to Fede Viarnés and Goncy for being the best mentors!



