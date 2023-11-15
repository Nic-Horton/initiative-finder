export const Conditions = [
  {
    name: "blinded",
    definition:
      "You can’t see. All normal terrain is difficult terrain to you. You can’t detect anything using vision. You automatically critically fail Perception checks that require you to be able to see, and if vision is your only precise sense, you take a -4 status penalty to Perception checks. You are immune to visual effects. Blinded overrides dazzled.",
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
    name: "broken",
    definition: `Broken is a condition that affects objects. 
        An object is broken when damage has reduced its Hit Points to equal or less than its Broken Threshold. 
        A broken object cant be used for its normal function, nor does it grant bonuses— with the exception of armor. 
        Broken armor still grants its item bonus to AC, but it also imparts a status penalty to AC depending on its category: –1 for broken light armor, –2 for broken medium armor, or –3 for broken heavy armor.`,
    conditionEffects: [
      {
        stage: 1,
        acEffect: -1,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 2,
        acEffect: -2,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 3,
        acEffect: -3,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
    ],
  },
  {
    name: "clumsy",
    definition:
      "Your movements become clumsy and inexact. Clumsy always includes a value. You take a status penalty equal to the condition value to Dexterity-based checks and DCs, including AC, Reflex saves, ranged attack rolls, and skill checks using Acrobatics, Stealth, and Thievery.",
    conditionEffects: [
      {
        stage: 1,
        acEffect: -1,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: -1,
      },
      {
        stage: 2,
        acEffect: -2,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: -2,
      },
      {
        stage: 3,
        acEffect: -3,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: -3,
      },
    ],
  },
  {
    name: "confused",
    definition: `You dont have your wits about you, and you attack wildly.
        You are flat-footed, you dont treat anyone as your ally (though they might still treat you as theirs), and you cant Delay, Ready, or use reactions. 
        You use all your actions to Strike or cast offensive cantrips, though the GM can have you use other actions to facilitate attack, such as draw a weapon, move so that a target is in reach, and so forth. 
        Your targets are determined randomly by the GM. If you have no other viable targets, you target yourself, automatically hitting but not scoring a critical hit.
        If its impossible for you to attack or cast spells, you babble incoherently, wasting your actions. 
        Each time you take damage from an attack or spell, you can attempt a DC 11 flat check to recover from your confusion and end the condition.`,
    conditionEffects: [
      {
        stage: 1,
        acEffect: -2,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
    ],
  },
  {
    name: "controlled",
    definition:
      "Someone else is making your decisions for you, usually because youre being commanded or magically dominated. The controller dictates how you act and can make you use any of your actions, including attacks, reactions, or even Delay. The controller usually does not have to spend their own actions when controlling you.",
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
    name: "dazzled",
    definition:
      "definition Your eyes are overstimulated. If vision is your only precise sense, all creatures and objects are concealed from you.",
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
    name: "deafened",
    definition:
      "You cant hear. You automatically critically fail Perception checks that require you to be able to hear. You take a –2 status penalty to Perception checks for initiative and checks that involve sound but also rely on other senses. If you perform an action with the auditory trait, you must succeed at a DC 5 flat check or the action is lost; attempt the check after spending the action but before any effects are applied. You are immune to auditory effects.",
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
    name: "doomed",
    definition:
      "A powerful force has gripped your soul, calling you closer to death. Doomed always includes a value. The dying value at which you die is reduced by your doomed value. If your maximum dying value is reduced to 0, you instantly die. When you die, youre no longer doomed. Your doomed value decreases by 1 each time you get a full nights rest.",
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
    name: "drained",
    definition: `When a creature successfully drains you of blood or life force, you become less healthy. 
        Drained always includes a value. 
        You take a status penalty equal to your drained value on Constitution-based checks, such as Fortitude saves. 
        You also lose a number of Hit Points equal to your level (minimum 1) times the drained value, and your maximum Hit Points are reduced by the same amount. 
        For example, if you’re hit by an effect that inflicts drained 3 and you’re a 3rd-level character, you lose 9 Hit Points and reduce your maximum Hit Points by 9. 
        Losing these Hit Points doesn’t count as taking damage.Each time you get a full night’s rest, your drained value decreases by 1. 
        This increases your maximum Hit Points, but you don’t immediately recover the lost Hit Points.`,
    conditionEffects: [
      {
        stage: 1,
        acEffect: -1,
        fortitudeEffect: -1,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 2,
        acEffect: -2,
        fortitudeEffect: -2,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 3,
        acEffect: -3,
        fortitudeEffect: -3,
        willEffect: null,
        reflexEffect: null,
      },
    ],
  },
  {
    name: "dying",
    definition: `You are bleeding out or otherwise at death’s door. 
        While you have this condition, you are unconscious.
        Dying always includes a value, and if it ever reaches dying 4, you die. 
        If you’re dying, you must attempt a recovery check at the start of your turn each round to determine whether you get better or worse. 
        Your dying condition increases by 1 if you take damage while dying, or by 2 if you take damage from an enemy’s critical hit or a critical failure on your save. 
        If you lose the dying condition by succeeding at a recovery check and are still at 0 Hit Points, you remain unconscious, but you can wake up as described in that condition. 
        You lose the dying condition automatically and wake up if you ever have 1 Hit Point or more. 
        Any time you lose the dying condition, you gain the wounded 1 condition, or increase your wounded condition value by 1 if you already have that condition.`,
    conditionEffects: [
      {
        stage: 1,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 2,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 3,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 4,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
    ],
  },
  {
    name: "encumbered",
    definition:
      "You are carrying more weight than you can manage. While you’re encumbered, you’re clumsy 1 and take a 10-foot penalty to all your Speeds. As with all penalties to your Speed, this can’t reduce your Speed below 5 feet.",
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
    name: "enfeebled",
    definition:
      "Youre physically weakened. Enfeebled always includes a value. When you are enfeebled, you take a status penalty equal to the condition value to Strength-based rolls and DCs, including Strength-based melee attack rolls, Strength-based damage rolls, and Athletics checks.",
    conditionEffects: [
      {
        stage: 1,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 2,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 3,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 4,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
    ],
  },
  {
    name: "fascinated",
    definition:
      "You are compelled to focus your attention on something, distracting you from whatever else is going on around you. You take a –2 status penalty to Perception and skill checks, and you cant use actions with the concentrate trait unless they or their intended consequences are related to the subject of your fascination as determined by the GM. For instance, you might be able to Seek and Recall Knowledge about the subject, but you likely couldnt cast a spell targeting a different creature. This condition ends if a creature uses hostile actions against you or any of your allies.",
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
    name: "fatigued",
    definition:
      "Youre tired and cant summon much energy. You take a –1 status penalty to AC and saving throws. You cant use exploration activities performed while traveling, such as those listed here.",
    conditionEffects: [
      {
        stage: 1,
        acEffect: -1,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
    ],
  },
  {
    name: "flatfooted",
    definition:
      "You’re distracted or otherwise unable to focus your full attention on defense. You take a –2 circumstance penalty to AC. Some effects give you the flat-footed condition only to certain creatures or against certain attacks. Others—especially conditions—can make you universally flat-footed against everything. If a rule doesn’t specify that the condition applies only to certain circumstances, it applies to all of them; for example, many effects simply say “The target is flat-footed.”",
    conditionEffects: [
      {
        stage: 1,
        acEffect: -2,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
    ],
  },
  {
    name: "fleeing",
    definition:
      "Youre forced to run away due to fear or some other compulsion. On your turn, you must spend each of your actions trying to escape the source of the fleeing condition as expediently as possible (such as by using move actions to flee, or opening doors barring your escape). The source is usually the effect or caster that gave you the condition, though some effects might define something else as the source. You cant Delay or Ready while fleeing.",
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
    name: "friendly",
    definition:
      "This condition reflects a creatures disposition toward a particular character, and only supernatural effects (like a spell) can impose this condition on a PC. A creature that is friendly to a character likes that character. The character can attempt to Make a Request of a friendly creature, and the friendly creature is likely to agree to a simple and safe request that doesnt cost it much to fulfill. If the character or one of their allies uses hostile actions against the creature, the creature gains a worse attitude condition depending on the severity of the hostile action, as determined by the GM.",
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
    name: "frightened",
    definition:
      "You’re gripped by fear and struggle to control your nerves. The frightened condition always includes a value. You take a status penalty equal to this value to all your checks and DCs. Unless specified otherwise, at the end of each of your turns, the value of your frightened condition decreases by 1.",
    conditionEffects: [
      {
        stage: 1,
        acEffect: -1,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 2,
        acEffect: -1,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
    ],
  },
  {
    name: "grabbed",
    definition:
      "Youre held in place by another creature, giving you the flat-footed and immobilized conditions. If you attempt a manipulate action while grabbed, you must succeed at a DC 5 flat check or it is lost; roll the check after spending the action, but before any effects are applied.",
    conditionEffects: [
      {
        stage: 1,
        acEffect: -2,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
    ],
  },
  {
    name: "helpful",
    definition:
      "This condition reflects a creatures disposition toward a particular character, and only supernatural effects (like a spell) can impose this condition on a PC. A creature that is helpful to a character wishes to actively aid that character. It will accept reasonable Requests from that character, as long as such requests arent at the expense of the helpful creatures goals or quality of life. If the character or one of their allies uses a hostile action against the creature, the creature gains a worse attitude condition depending on the severity of the hostile action, as determined by the GM.",
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
    name: "hostile",
    definition:
      "This condition reflects a creatures disposition toward a particular character, and only supernatural effects (like a spell) can impose this condition on a PC. A creature that is hostile to a character actively seeks to harm that character. It doesnt necessarily attack, but it wont accept Requests from the character.",
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
    name: "immobilized",
    definition:
      "You cant use any action with the move trait. If youre immobilized by something holding you in place and an external force would move you out of your space, the force must succeed at a check against either the DC of the effect holding you in place or the relevant defense (usually Fortitude DC) of the monster holding you in place.",
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
    name: "indifferent",
    definition:
      "This condition reflects a creatures disposition toward a particular character, and only supernatural effects (like a spell) can impose this condition on a PC. A creature that is indifferent to a character doesnt really care one way or the other about that character. Assume a creatures attitude to a given character is indifferent unless specified otherwise.",
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
    name: "observed",
    definition:
      "Anything in plain view is observed by you. If a creature takes measures to avoid detection, such as by using Stealth to Hide, it can become hidden or undetected instead of observed. If you have another precise sense instead of or in addition to sight, you might be able to observe a creature or object using that sense instead. You can observe a creature only with precise senses. When Seeking a creature using only imprecise senses, it remains hidden, rather than observed.",
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
    name: "paralyzed",
    definition:
      "Your body is frozen in place. You have the flat-footed condition and cant act except to Recall Knowledge and use actions that require only the use of your mind (as determined by the GM). Your senses still function, but only in the areas you can perceive without moving your body, so you cant Seek while paralyzed.",
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
    name: "persistant damage",
    definition:
      "Persistent damage comes from effects like acid, being on fire, or many other situations. It appears as “X persistent [type] damage,” where “X” is the amount of damage dealt and “[type]” is the damage type. Like normal damage, it can be doubled or halved based on the results of an attack roll or saving throw. Instead of taking persistent damage immediately, you take it at the end of each of your turns as long as you have the condition, rolling any damage dice anew each time. After you take persistent damage, roll a DC 15 flat check to see if you recover from the persistent damage. If you succeed, the condition ends.",
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
    name: "petrified",
    definition:
      "You have been turned to stone. You can’t act, nor can you sense anything. You become an object with a Bulk double your normal Bulk (typically 12 for a petrified Medium creature or 6 for a petrified Small creature), AC 9, Hardness 8, and the same current Hit Points you had when alive. You don’t have a Broken Threshold. When you’re turned back into flesh, you have the same number of Hit Points you had as a statue. If the statue is destroyed, you immediately die. While petrified, your mind and body are in stasis, so you don’t age or notice the passing of time.",
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
    name: "prone",
    definition: `Youre lying on the ground. You are flat-footed and take a –2 circumstance penalty to attack rolls. 
        The only move actions you can use while youre prone are Crawl and Stand. 
        Standing up ends the prone condition. 
        You can Take Cover while prone to hunker down and gain greater cover against ranged attacks, even if you dont have an object to get behind, gaining a +4 circumstance bonus to AC against ranged attacks (but you remain flat-footed). 
        If you would be knocked prone while youre Climbing or Flying, you fall (see Falling for the rules on falling). 
        You cant be knocked prone when Swimming.`,
    conditionEffects: [
      {
        stage: 1,
        acEffect: -2,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
    ],
  },
  {
    name: "restrained",
    definition: `Youre tied up and can barely move, or a creature has you pinned.
        You have the flat-footed and immobilized conditions, 
        and you cant use any actions with the attack or manipulate traits except to attempt to Escape or Force Open your bonds.
        Restrained overrides grabbed.`,
    conditionEffects: [
      {
        stage: 1,
        acEffect: -2,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
    ],
  },
  {
    name: "sickened",
    definition: `You feel ill. Sickened always includes a value. You take a status penalty equal to this value on all your checks and DCs. 
        You cant willingly ingest anything—including elixirs and potions—while sickened. 
        You can spend a single action retching in an attempt to recover, which lets you immediately attempt a Fortitude save against the DC of the effect that made you sickened.
        On a success, you reduce your sickened value by 1 (or by 2 on a critical success).`,
    conditionEffects: [
      {
        stage: 1,
        acEffect: -1,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 2,
        acEffect: -2,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 3,
        acEffect: -3,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 4,
        acEffect: -4,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
    ],
  },
  {
    name: "slowed",
    definition:
      "You have fewer actions. Slowed always includes a value. When you regain your actions at the start of your turn, reduce the number of actions you regain by your slowed value. Because slowed has its effect at the start of your turn, you dont immediately lose actions if you become slowed during your turn.",
    conditionEffects: [
      {
        stage: 1,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 2,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 3,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
    ],
  },
  {
    name: "stunned",
    definition: `Youve become senseless. 
        You cant act while stunned. 
        Stunned usually includes a value, which indicates how many total actions you lose, possibly over multiple turns, from being stunned. 
        Each time you regain actions (such as at the start of your turn), reduce the number you regain by your stunned value, then reduce your stunned value by the number of actions you lost. 
        For example, if you were stunned 4, you would lose all 3 of your actions on your turn, reducing you to stunned 1; on your next turn, you would lose 1 more action, and then be able to use your remaining 2 actions normally. 
        Stunned might also have a duration instead of a value, such as “stunned for 1 minute.” In this case, you lose all your actions for the listed duration. Stunned overrides slowed. 
        If the duration of your stunned condition ends while you are slowed, you count the actions lost to the stunned condition toward those lost to being slowed. 
        So, if you were stunned 1 and slowed 2 at the beginning of your turn, you would lose 1 action from stunned, and then lose only 1 additional action by being slowed, so you would still have 1 action remaining to use that turn.`,
    conditionEffects: [
      {
        stage: 1,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 2,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 3,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 4,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
    ],
  },
  {
    name: "stupified",
    definition: `Your thoughts and instincts are clouded. Stupefied always includes a value. You take a status penalty equal to this value on Intelligence-, Wisdom-, and Charisma-based checks and DCs, including Will saving throws, spell attack rolls, spell DCs, and skill checks that use these ability scores. 
        Any time you attempt to Cast a Spell while stupefied, the spell is disrupted unless you succeed at a flat check with a DC equal to 5 + your stupefied value.`,
    conditionEffects: [
      {
        stage: 1,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: -1,
        reflexEffect: null,
      },
      {
        stage: 2,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: -2,
        reflexEffect: null,
      },
      {
        stage: 3,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: -3,
        reflexEffect: null,
      },
      {
        stage: 4,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: -4,
        reflexEffect: null,
      },
    ],
  },
  {
    name: "unconcious",
    definition: `You're sleeping, or you've been knocked out. You can't act. You take a –4 status penalty to AC, Perception, and Reflex saves, and you have the blinded and flat-footed conditions. When you gain this condition, you fall prone and drop items you are wielding or holding unless the effect states otherwise or the GM determines you're in a position in which you wouldn't.

        If you're unconscious because you're dying, you can't wake up while you have 0 Hit Points. If you are restored to 1 Hit Point or more via healing, you lose the dying and unconscious conditions and can act normally on your next turn.
        
        If you are unconscious and at 0 Hit Points, but not dying, you naturally return to 1 Hit Point and awaken after sufficient time passes. The GM determines how long you remain unconscious, from a minimum of 10 minutes to several hours. If you receive healing during this time, you lose the unconscious condition and can act normally on your next turn.
        
        If you're unconscious and have more than 1 Hit Point (typically because you are asleep or unconscious due to an effect), you wake up in one of the following ways. Each causes you to lose the unconscious condition.
        You take damage, provided the damage doesn't reduce you to 0 Hit Points. If the damage reduces you to 0 Hit Points, you remain unconscious and gain the dying condition as normal.
        You receive healing, other than the natural healing you get from resting.
        Someone shakes you awake with an Interact action.
        There's loud noise going on around you—though this isn't automatic. At the start of your turn, you automatically attempt a Perception check against the noise's DC (or the lowest DC if there is more than one noise), waking up if you succeed. If creatures are attempting to stay quiet around you, this Perception check uses their Stealth DCs. Some magical effects make you sleep so deeply that they don't allow you to attempt this Perception check.
        If you are simply asleep, the GM decides you wake up either because you have had a restful night's sleep or something disrupted that rest.`,
    conditionEffects: [
      {
        stage: 1,
        acEffect: -4,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: -4,
      },
    ],
  },
  {
    name: "undetected",
    definition: `When you are undetected by a creature, that creature cannot see you at all, has no idea what space you occupy, and can't target you, though you still can be affected by abilities that target an area. When you're undetected by a creature, that creature is flat-footed to you.

        A creature you're undetected by can guess which square you're in to try targeting you. 
        
        It must pick a square and attempt an attack. This works like targeting a hidden creature (requiring a DC 11 flat check), but the flat check and attack roll are rolled in secret by the GM, who doesn't reveal whether the attack missed due to failing the flat check, failing the attack roll, or choosing the wrong square.
        
        A creature can use the Seek action to try to find you.`,
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
    name: "unfriendly",
    definition: `This condition reflects a creature's disposition toward a particular character, and only supernatural effects (like a spell) can impose this condition on a PC. 
        A creature that is unfriendly to a character dislikes and specifically distrusts that character. The unfriendly creature won't accept Requests from the character.`,
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
    name: "wounded",
    definition: `You have been seriously injured. 
        If you lose the dying condition and do not already have the wounded condition, you become wounded 1. 
        If you already have the wounded condition when you lose the dying condition, your wounded condition value increases by 1. 
        If you gain the dying condition while wounded, increase your dying condition value by your wounded value.
        The wounded condition ends if someone successfully restores Hit Points to you with Treat Wounds, or if you are restored to full Hit Points and rest for 10 minutes.`,
    conditionEffects: [
      {
        stage: 1,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 2,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 3,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
      {
        stage: 4,
        acEffect: null,
        fortitudeEffect: null,
        willEffect: null,
        reflexEffect: null,
      },
    ],
  },
];
