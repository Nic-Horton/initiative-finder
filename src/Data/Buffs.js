export const Buffs = [
	{
		name: 'hidden',
		definition:
			'While youre hidden from a creature, that creature knows the space youre in but cant tell precisely where you are. You typically become hidden by using Stealth to Hide. When Seeking a creature using only imprecise senses, it remains hidden, rather than observed. A creature youre hidden from is flat-footed to you, and it must succeed at a DC 11 flat check when targeting you with an attack, spell, or other effect or it fails to affect you. Area effects arent subject to this flat check. A creature might be able to use the Seek action to try to observe you.',
		conditionEffects: [
			{
				stage: 1,
				acEffect: null,
				fortitudeEffect: null,
				willEffect: null,
				reflexEffect: null,
			},
		],
	},
	{
		name: 'invisible',
		definition:
			'While invisible, you cant be seen. Youre undetected to everyone. Creatures can Seek to attempt to detect you; if a creature succeeds at its Perception check against your Stealth DC, you become hidden to that creature until you Sneak to become undetected again. If you become invisible while someone can already see you, you start out hidden to the observer (instead of undetected) until you successfully Sneak. You cant become observed while invisible except via special abilities or magic.',
		conditionEffects: [
			{
				stage: 1,
				acEffect: null,
				fortitudeEffect: null,
				willEffect: null,
				reflexEffect: null,
			},
		],
	},
	{
		name: 'quickened',
		definition: `You gain 1 additional action at the start of your turn each round. 
        Many effects that make you quickened specify the types of actions you can use with this additional action. 
        If you become quickened from multiple sources, you can use the extra action you’ve been granted for any single action allowed by any of the effects that made you quickened. 
        Because quickened has its effect at the start of your turn, you don’t immediately gain actions if you become quickened during your turn.`,
		conditionEffects: [
			{
				stage: 1,
				acEffect: null,
				fortitudeEffect: null,
				willEffect: null,
				reflexEffect: null,
			},
		],
	},
	{
		name: 'unnoticed',
		definition: `If you are unnoticed by a creature, that creature has no idea you are present at all.
        When you're unnoticed, you're also undetected by the creature. 
        This condition matters for abilities that can be used only against targets totally unaware of your presence.`,
		conditionEffects: [
			{
				stage: 1,
				acEffect: null,
				fortitudeEffect: null,
				willEffect: null,
				reflexEffect: null,
			},
		],
	},
	{
		name: 'concealed',
		definition:
			'While you are concealed from a creature, such as in a thick fog, you are difficult for that creature to see. You can still be observed, but youre tougher to target. A creature that youre concealed from must succeed at a DC 5 flat check when targeting you with an attack, spell, or other effect. Area effects arent subject to this flat check. If the check fails, the attack, spell, or effect doesnt affect you.',
		conditionEffects: [
			{
				stage: 1,
				acEffect: null,
				fortitudeEffect: null,
				willEffect: null,
				reflexEffect: null,
			},
		],
	},
];
