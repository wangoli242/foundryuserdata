// import { injectConfig } from "./injectConfig.js";

const MODULE_ID = "about-face";
const IndicatorMode = {
	OFF: 0,
	HOVER: 1,
	ALWAYS: 2,
};
const facingOptions = {
	global: {},
	none: {},
	rotate: {
		right: "about-face.options.facing-direction.choices.right",
		left: "about-face.options.facing-direction.choices.left",
		down: "about-face.options.facing-direction.choices.down",
		up: "about-face.options.facing-direction.choices.up",
	},
	"flip-h": {
		right: "about-face.options.facing-direction.choices.right",
		left: "about-face.options.facing-direction.choices.left",
	},
	"flip-v": {
		down: "about-face.options.facing-direction.choices.down",
		up: "about-face.options.facing-direction.choices.up",
	},
};

function getAllTokens() {
	const tokens = [];
	canvas.scene.tokens.forEach((tokenDocument) => {
		if (tokenDocument.object) tokens.push(tokenDocument.object);
	});
	return tokens;
}

function registerSettings() {
	const SYSTEM_DEFAULTS = {};
	let system = /gurps/.exec(game.system.id);
	if (system) {
		switch (system[0]) {
			case "gurps":
				SYSTEM_DEFAULTS.lockArrowToFace = true;
				SYSTEM_DEFAULTS["flip-or-rotate"] = "rotate";
				break;
			default:
				console.error("About Face | Somehow, this happened.");
		}
	}

	game.settings.register(MODULE_ID, "arrowColor", {
		name: "about-face.options.arrowColor.name",
		hint: "about-face.options.arrowColor.hint",
		scope: "world",
		config: true,
		type: new foundry.data.fields.ColorField({ nullable: false, initial: "#000000" }),
		onChange: (value) => {
			game.aboutFace.indicatorColor = value.css;
			if (canvas === null) return;
			const tokens = getAllTokens();
			for (const token of tokens) {
				if (token.aboutFaceIndicator) {
					token.aboutFaceIndicator.destroy();
					game.aboutFace.drawAboutFaceIndicator(token);
				}
			}
		},
	});

	game.settings.register(MODULE_ID, "arrowDistance", {
		name: "about-face.options.arrowDistance.name",
		hint: "about-face.options.arrowDistance.hint",
		scope: "world",
		config: true,
		default: 1.4,
		type: Number,
		range: {
			min: 1.0,
			max: 1.4,
			step: 0.05,
		},
		onChange: (value) => {
			game.aboutFace.indicatorDistance = value;
			if (canvas === null) return;
			const tokens = getAllTokens();
			for (const token of tokens) {
				if (token.aboutFaceIndicator) game.aboutFace.drawAboutFaceIndicator(token);
			}
		},
	});

	game.settings.register(MODULE_ID, "sprite-type", {
		name: "about-face.options.indicator-sprite.name",
		hint: "about-face.options.indicator-sprite.hint",
		scope: "world",
		config: true,
		default: 1.0,
		type: Number,
		range: {
			min: 0.5,
			max: 2.0,
			step: 0.05,
		},
		onChange: (value) => {
			game.aboutFace.indicatorSize = value;
			if (canvas === null) return;
			const tokens = getAllTokens();
			for (const token of tokens) {
				game.aboutFace.drawAboutFaceIndicator(token);
			}
		},
	});

	game.settings.register(MODULE_ID, "indicator-state", {
		name: "about-face.options.enable-indicator.name",
		hint: "about-face.options.enable-indicator.hint",
		scope: "world",
		config: true,
		default: 2,
		type: Number,
		choices: {
			0: "about-face.options.enable-indicator.choices.0",
			1: "about-face.options.enable-indicator.choices.1",
			2: "about-face.options.enable-indicator.choices.2",
		},
		onChange: (value) => {
			value = Number(value);
			if (value === IndicatorMode.HOVER) {
				Hooks.on("hoverToken", tokenHover);
				Hooks.on("highlightObjects", highlightObjects);
			} else {
				Hooks.off("hoverToken", tokenHover);
				Hooks.off("highlightObjects", highlightObjects);
			}
			toggleAllIndicators(value === IndicatorMode.ALWAYS);
		},
	});

	game.settings.register(MODULE_ID, "indicator-state-pc", {
		name: "about-face.options.enable-indicator-pc.name",
		hint: "about-face.options.enable-indicator-pc.hint",
		scope: "world",
		config: true,
		default: 2,
		type: Number,
		choices: {
			0: "about-face.options.enable-indicator.choices.0",
			1: "about-face.options.enable-indicator.choices.1",
			2: "about-face.options.enable-indicator.choices.2",
		},
		onChange: (value) => {
			value = Number(value);
			if (value === IndicatorMode.HOVER) {
				Hooks.on("hoverToken", tokenHover);
				Hooks.on("highlightObjects", highlightObjects);
			} else {
				Hooks.off("hoverToken", tokenHover);
				Hooks.off("highlightObjects", highlightObjects);
			}
			toggleAllIndicators(value === IndicatorMode.ALWAYS, true);
		},
	});

	game.settings.register(MODULE_ID, "indicatorDrawingType", {
		name: "about-face.options.indicatorDrawingType.name",
		hint: "about-face.options.indicatorDrawingType.hint",
		scope: "world",
		config: true,
		default: 0,
		type: Number,
		choices: {
			0: game.i18n.localize("about-face.options.indicatorDrawingType.options.arrow"),
			1: game.i18n.localize("about-face.options.indicatorDrawingType.options.line"),
		},
		requiresReload: true,
	});

	game.settings.register(MODULE_ID, "combatOnly", {
		name: "about-face.options.combatOnly.name",
		hint: "about-face.options.combatOnly.hint",
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
		onChange: (value) => {
			game.aboutFace.combatOnly = value;
			if (canvas === null) return;
			const tokens = getAllTokens();
			for (const token of tokens) {
				game.aboutFace.drawAboutFaceIndicator(token);
			}
		},
	});

	game.settings.register(MODULE_ID, "hideIndicatorOnDead", {
		name: "about-face.options.hideIndicatorOnDead.name",
		hint: "about-face.options.hideIndicatorOnDead.hint",
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
		onChange: (value) => {
			game.aboutFace.hideIndicatorOnDead = value;
			if (canvas === null) return;
			const tokens = getAllTokens();
			for (const token of tokens) {
				game.aboutFace.drawAboutFaceIndicator(token);
			}
		},
	});

	game.settings.register(MODULE_ID, "lockArrowToFace", {
		name: "about-face.options.lockArrowToFace.name",
		hint: "about-face.options.lockArrowToFace.hint",
		scope: "world",
		config: true,
		default: SYSTEM_DEFAULTS.lockArrowToFace || false,
		type: Boolean,
	});

	game.settings.register(MODULE_ID, "flip-or-rotate", {
		name: "about-face.options.flip-or-rotate.name",
		hint: "about-face.options.flip-or-rotate.hint",
		scope: "world",
		config: true,
		type: new foundry.data.fields.StringField({required: true, initial: SYSTEM_DEFAULTS["flip-or-rotate"] || "flip-h",
			choices: {
				rotate: "about-face.options.flip-or-rotate.choices.rotate",
				"flip-h": "about-face.options.flip-or-rotate.choices.flip-h",
				"flip-v": "about-face.options.flip-or-rotate.choices.flip-v",
			}}),
	});
	game.settings.register(MODULE_ID, "facing-direction", {
		name: "about-face.options.facing-direction.name",
		hint: "about-face.options.facing-direction.hint",
		scope: "world",
		config: true,
		default: "right",
		type: String,
		choices: {
			right: "about-face.options.facing-direction.choices.right",
			left: "about-face.options.facing-direction.choices.left",
		},
	});
}

async function renderSettingsConfigHandler(app, html) {
	if (!game.user.isGM) return;
	const flipOrRotate = game.settings.get(MODULE_ID, "flip-or-rotate");
	const flipOrRotateSelect = html.querySelector('select[name="about-face.flip-or-rotate"]');
	const flipDirectionSelect = html.querySelector('select[name="about-face.facing-direction"]');
	replaceSelectChoices(flipDirectionSelect, facingOptions[flipOrRotate] ?? {});

	flipOrRotateSelect.addEventListener("change", (event) => {
		const facingDirections = facingOptions[event.target.value] ?? {};
		replaceSelectChoices(flipDirectionSelect, facingDirections);
	});
}

function replaceSelectChoices(select, choices) {
	const facing = game.settings.get(MODULE_ID, "facing-direction");
	select.innerHTML = "";
	let hasGlobal = false;
	for (const [key, value] of Object.entries(choices)) {
		if (key === "global") hasGlobal = true;
		const option = document.createElement("option");
		option.value = key;
		option.textContent = game.i18n.localize(value);
		option.selected = key === "global" || (!hasGlobal && facing === key);
		select.appendChild(option);
	}
}

function toggleAllIndicators(state, playerOwner = false) {
	if (canvas === null) return;
	const tokens = getAllTokens();
	tokens.forEach((token) => {
		if (token.actor.hasPlayerOwner === playerOwner && token.aboutFaceIndicator) {
			token.aboutFaceIndicator.graphics.visible = state;
		}
	});
}

function tokenHover(token, hovered) {
	if (hovered) {
		game.aboutFace.drawAboutFaceIndicator(token);
	} else if (token.aboutFaceIndicator) {
		token.aboutFaceIndicator.graphics.visible = false;
	}
}
function highlightObjects(highlighted) {
	canvas.scene.tokens.forEach((tokenDocument) => {
		if (highlighted) {
			game.aboutFace.drawAboutFaceIndicator(tokenDocument.object);
		} else if (tokenDocument.object.aboutFaceIndicator) {
			tokenDocument.object.aboutFaceIndicator.graphics.visible = false;
		}
	});
}

class AboutFace {
	constructor() {
		this.combatOnly = game.settings.get("about-face", "combatOnly");
		this.indicatorColor = game.settings.get(MODULE_ID, "arrowColor").css;
		this.indicatorDistance = game.settings.get(MODULE_ID, "arrowDistance");
		this.hideIndicatorOnDead = game.settings.get("about-face", "hideIndicatorOnDead");
		this.indicatorDrawingType = game.settings.get("about-face", "indicatorDrawingType");
		this.indicatorSize = game.settings.get("about-face", "sprite-type");
		this._tokenRotation = false;
	}

	get tokenRotation() {
		return this._tokenRotation;
	}

	set tokenRotation(value) {
		this._tokenRotation = value;
	}

	isCombatRunning() {
		return game.combats.some((combat) => combat.started);
	}

	drawAboutFaceIndicator(token) {
		const { DEFEATED } = CONFIG.specialStatusEffects;
		const isDefeated = token.actor?.effects.some((el) => el.statuses.has(DEFEATED));
		if (this.combatOnly && !this.combatRunning) {
			if (token.aboutFaceIndicator && !token.aboutFaceIndicator?._destroyed) {
				token.aboutFaceIndicator.graphics.visible = false;
			}
			return;
		}
		if (this.hideIndicatorOnDead && isDefeated) {
			if (token.aboutFaceIndicator && !token.aboutFaceIndicator?._destroyed) {
				token.aboutFaceIndicator.graphics.visible = false;
			}
			return;
		}
		if (token.document.isSecret) return;
		try {
			// get the rotation of the token
			let tokenDirection = token.document.flags[MODULE_ID]?.direction
				?? getIndicatorDirection(token.document) ?? 90;

			// Calculate indicator's distance
			const indicatorDistance = this.indicatorDistance;
			const maxTokenSize = Math.max(token.w, token.h);
			const distance = (maxTokenSize / 2) * indicatorDistance;

			// Calculate indicator's scale
			const tokenSize = Math.max(token.document.width, token.document.height);
			const tokenScale = Math.abs(token.document.texture.scaleX) + Math.abs(token.document.texture.scaleY);
			const indicatorSize = this.indicatorSize || 1;
			const scale = ((tokenSize * tokenScale) / 2) * indicatorSize;

			// Create or update the about face indicator
			// updateAboutFaceIndicator(token, tokenDirection, distance, scale);
			const { w: width, h: height } = token;
			if (!token.aboutFaceIndicator || token.aboutFaceIndicator._destroyed) {
				const container = new PIXI.Container({ name: "aboutFaceIndicator", width, height });
				container.name = "aboutFaceIndicator";
				container.width = width;
				container.height = height;
				container.x = width / 2;
				container.y = height / 2;
				const graphics = new PIXI.Graphics();
				// draw an arrow indicator
				// drawArrow(graphics);
				const color = `0x${this.indicatorColor.substring(1, 7)}` || "";
				graphics.beginFill(color, 0.5).lineStyle(2, color, 1).moveTo(0, 0);
				if (this.indicatorDrawingType === 0) {
					graphics.lineTo(0, -10).lineTo(10, 0).lineTo(0, 10).lineTo(0, 0).closePath().endFill();
				} else if (this.indicatorDrawingType === 1) {
					graphics.lineTo(-10, -20).lineTo(0, 0).lineTo(-10, 20).lineTo(0, 0).closePath().endFill();
				}
				// place the arrow in the correct position
				container.angle = tokenDirection;
				graphics.x = distance;
				graphics.scale.set(scale, scale);
				// add the graphics to the container
				container.addChild(graphics);
				container.graphics = graphics;
				token.aboutFaceIndicator = container;
				// add the container to the token
				token.addChild(container);
			} else {
				let container = token.aboutFaceIndicator;
				let graphics = container.graphics;
				container.x = width / 2;
				container.y = height / 2;
				graphics.x = distance;
				graphics.scale.set(scale, scale);
				// update the rotation of the arrow
				container.angle = tokenDirection;
			}

			// Set the visibility of the indicator based on the current indicator mode
			const indicatorState = token?.actor?.hasPlayerOwner
				? game.settings.get(MODULE_ID, "indicator-state-pc")
				: game.settings.get(MODULE_ID, "indicator-state");
			const indicatorDisabled = token.document.getFlag(MODULE_ID, "indicatorDisabled");

			if (indicatorState === IndicatorMode.OFF || indicatorDisabled) {
				token.aboutFaceIndicator.graphics.visible = false;
			} else if (indicatorState === IndicatorMode.HOVER) token.aboutFaceIndicator.graphics.visible = token.hover;
			else if (indicatorState === IndicatorMode.ALWAYS) token.aboutFaceIndicator.graphics.visible = true;
		} catch(error) {
			console.error(
				`About Face | Error drawing the indicator for token ${token.name} (ID: ${token.id}, Type: ${
					token.document?.actor?.type ?? null
				})`,
				error
			);
		}
	}
}

// HOOKS

function onPreCreateToken(tokenDocument, data, options, userId) {
	const updates = { flags: { [MODULE_ID]: {} } };
	let facingDirection = tokenDocument.flags[MODULE_ID]?.facingDirection;
	if (facingDirection === "global") facingDirection = game.settings.get(MODULE_ID, "facing-direction");
	if (facingDirection) {
		const flipMode = game.settings.get(MODULE_ID, "flip-or-rotate");
		const gridType = getGridType();
		if (gridType === 0 || (gridType === 1 && flipMode === "flip-h") || (gridType === 2 && flipMode === "flip-v")) {
			const TokenDirections = {
				down: 90,
				right: 360,
				up: 270,
				left: 180,
			};
			if (tokenDocument.flags?.[MODULE_ID]?.direction === undefined) {
				updates.flags[MODULE_ID].direction = TokenDirections[facingDirection];
			}
		}
	}
	if (Object.keys(updates).length) tokenDocument.updateSource(updates);
}

function onPreUpdateToken(tokenDocument, updates, options, userId) {
	if (
		game.modules.get("multilevel-tokens")?.active
		&& !game.multilevel._isReplicatedToken(tokenDocument)
		&& options?.mlt_bypass
	) {
		return;
	}

	const hasChanges = updates.x !== undefined && updates.y !== undefined;
	const noPositionChanges = !hasChanges || (tokenDocument.x === updates.x && tokenDocument.y === updates.y);
	const noRotation = updates.rotation === undefined || tokenDocument.rotation === updates.rotation;
	if (noPositionChanges && noRotation) return;

	let position = {};
	// store the direction in the token data

	const { x, y, rotation } = updates;
	const { flags, texture, x: tokenX, y: tokenY, rotation: tokenRotation } = tokenDocument;
	const flipOrRotate = getTokenFlipOrRotate(tokenDocument);
	let tokenDirection = (rotation ?? tokenRotation) + 90;

	if ((Number.isNumeric(x) || Number.isNumeric(y))) {
		// get previous and new positions
		const prevPos = { x: tokenX, y: tokenY };
		const newPos = { x: x ?? tokenX, y: y ?? tokenY };
		// get the direction in degrees of the movement
		let diffY = newPos.y - prevPos.y;
		let diffX = newPos.x - prevPos.x;

		if (canvas.grid.type && game.settings.get(MODULE_ID, "lockArrowToFace")) {
			const directions = [
				[45, 90, 135, 180, 225, 270, 315, 360], // Square
				[0, 60, 120, 180, 240, 300, 360], // Hex Rows
				[30, 90, 150, 210, 270, 330, 390], // Hex Columns
			];
			const gridType = getGridType();
			const facings = directions[gridType];
			if (facings && facings.length) {
				// convert negative dirs into a range from 0-360
				let normalizedDir = ((tokenDirection % 360) + 360) % 360; // Math.round(tokenDirection < 0 ? 360 + tokenDirection : tokenDirection);
				// find the largest normalized angle
				let secondAngle = facings.reduceRight(
					(prev, curr) => (curr < prev && curr > normalizedDir ? curr : prev)
				); // facings.find((e) => e > normalizedDir);
				// and assume the facing is 60 degrees (hexes) or 45 (square) to the counter clockwise
				tokenDirection = gridType ? secondAngle - 60 : secondAngle - 45;
				// unless the largest angle was closer
				if (secondAngle - normalizedDir < normalizedDir - tokenDirection) tokenDirection = secondAngle;
				// return tokenDirection to the range 180 to -180
				if (tokenDirection > 180) tokenDirection -= 360;
			}
			if (flipOrRotate === "rotate") {
				updates.rotation = tokenDirection - 90 + (flags[MODULE_ID]?.rotationOffset ?? 0);
			}
		} else if (rotation === undefined) {
			tokenDirection = (Math.atan2(diffY, diffX) * 180) / Math.PI;
		}
		foundry.utils.setProperty(updates, `flags.${MODULE_ID}.prevPos`, prevPos);
		position = { x: diffX, y: diffY };
	}
	foundry.utils.setProperty(updates, `flags.${MODULE_ID}.direction`, tokenDirection);

	if (flipOrRotate !== "rotate") {
		const [mirrorKey, mirrorVal] = getMirror(tokenDocument, position);
		if ((texture[mirrorKey] < 0 && !mirrorVal) || (texture[mirrorKey] > 0 && mirrorVal)) {
			const source = tokenDocument.toObject();
			updates[`texture.${mirrorKey}`] = source.texture[mirrorKey] * -1;
		}
	}
}

// HELPERS

function getGridType() {
	return Math.floor(canvas.grid.type / 2);
}

function getIndicatorDirection(tokenDocument) {
	const IndicatorDirections = {
		up: -90,
		right: 0,
		down: 90,
		left: 180,
	};
	const direction =
		tokenDocument.getFlag(MODULE_ID, "facingDirection") || game.settings.get(MODULE_ID, "facing-direction");
	return IndicatorDirections[direction];
}

function getTokenFlipOrRotate(tokenDocument) {
	const tokenFlipOrRotate = tokenDocument.getFlag(MODULE_ID, "flipOrRotate") || "global";
	return tokenFlipOrRotate !== "global" ? tokenFlipOrRotate : game.settings.get(MODULE_ID, "flip-or-rotate");
}

/**
 *
 * @param {TokenDocument} tokenDocument
 * @param {Object} position
 * @returns {Array}
 */
function getMirror(tokenDocument, position = {}) {
	if (!Object.keys(position).length) {
		// Taken from ClientKeybindings._handleMovement
		// Define movement offsets and get moved directions
		const directions = game.keybindings.moveKeys;
		let dx = 0;
		let dy = 0;

		const { LEFT, RIGHT, UP, DOWN } = foundry.helpers.interaction.ClientKeybindings.MOVEMENT_DIRECTIONS;

		// Assign movement offsets
		if (directions.has(LEFT)) dx -= 1;
		else if (directions.has(RIGHT)) dx += 1;
		if (directions.has(UP)) dy -= 1;
		else if (directions.has(DOWN)) dy += 1;

		position = { x: dx, y: dy };
	}
	const { x, y } = position;
	const tokenFacingDirection = tokenDocument.getFlag(MODULE_ID, "facingDirection") || "global";
	const facingDirection =
		tokenFacingDirection === "global" ? game.settings.get(MODULE_ID, "facing-direction") : tokenFacingDirection;
	const mirrorX = "scaleX";
	const mirrorY = "scaleY";
	if (facingDirection === "right") {
		if (x < 0) return [mirrorX, true];
		if (x > 0) return [mirrorX, false];
	} else if (facingDirection === "left") {
		if (x < 0) return [mirrorX, false];
		if (x > 0) return [mirrorX, true];
	} else if (facingDirection === "up") {
		if (y < 0) return [mirrorY, false];
		if (y > 0) return [mirrorY, true];
	} else if (facingDirection === "down") {
		if (y < 0) return [mirrorY, true];
		if (y > 0) return [mirrorY, false];
	}
	return [];
}

/**
 * About Face -- A Token Rotator
 * Rotates tokens based on the direction the token is moved
 *
 * by Eadorin, edzillion
 */

function addTokenConfigTab(cls) {
	cls.TABS.sheet.tabs.push({ id: "aboutFace", label: "About Face", icon: "fas fa-caret-down fa-fw" });

	libWrapper.register("about-face", `foundry.applications.sheets.${cls.name}.prototype._onChangeForm`, function (wrapped, formConfig, event) {
		wrapped(formConfig, event);
		if (event.target.name === "flags.about-face.flipOrRotate") {
			const flipOrRotate = this.element.querySelector('[name="flags.about-face.flipOrRotate"]').value;
			const facingDirection = this.element.querySelector('[name="flags.about-face.facingDirection"]');
			const option = flipOrRotate === "global" ? game.settings.get(MODULE_ID, "flip-or-rotate") : flipOrRotate;
			const choices = {
				global: {},
				...facingOptions[option]
			};
			if (flipOrRotate === "global") {
				choices.global = `${game.i18n.localize("about-face.options.flip-or-rotate.choices.global")} (${game.i18n.localize(
					`about-face.options.facing-direction.choices.${game.settings.get(MODULE_ID, "facing-direction")}`
				)})`;
			} else delete choices.global;
			replaceSelectChoices(facingDirection, choices);
		}
	});
}

async function renderTokenConfigHandler(form, data, options, docPath = "document") {
	if (!options.isFirstRender) return;
	const flipOrRotateSetting = game.settings.get(MODULE_ID, "flip-or-rotate");
	const flags = data[docPath].flags?.[MODULE_ID] ?? {};
	const tabData = {
		tab: data.tabs.aboutFace,
		indicatorDisabled: flags.indicatorDisabled,
		flipOrRotate: flags.flipOrRotate || "global",
		facingDirection: flags.facingDirection || "global",
		rotationOffset: flags.rotationOffset || 0,
		flipOrRotates: {
			global: `${game.i18n.localize("about-face.options.flip-or-rotate.choices.global")} (${game.i18n.localize(
				`about-face.options.flip-or-rotate.choices.${flipOrRotateSetting}`
			)})`,
			...game.settings.settings.get("about-face.flip-or-rotate").type.choices,
		},
		facingDirections: {
			global: `${game.i18n.localize("about-face.options.flip-or-rotate.choices.global")} (${game.i18n.localize(
				`about-face.options.facing-direction.choices.${game.settings.get(MODULE_ID, "facing-direction")}`
			)})`,
			...facingOptions[flipOrRotateSetting],
		}
	};
	const tab = await foundry.applications.handlebars.renderTemplate("modules/about-face/templates/token-config.html", tabData);
	const lastTab = [...form.querySelectorAll(".tab")].pop();
	lastTab.insertAdjacentHTML("afterend", tab);
}

function updateCombat(combat, updateData) {
	if (!game.aboutFace.combatOnly) return;
	game.aboutFace.combatRunning = game.aboutFace.isCombatRunning();
	canvas.tokens?.placeables.forEach((token) => {
		game.aboutFace.drawAboutFaceIndicator(token);
	});
}

Hooks.once("init", () => {
	registerSettings();
	game.aboutFace = new AboutFace();

	addTokenConfigTab(foundry.applications.sheets.TokenConfig);
	addTokenConfigTab(foundry.applications.sheets.PrototypeTokenConfig);

	if (game.settings.get(MODULE_ID, "indicator-state") === 1) {
		Hooks.on("hoverToken", tokenHover);
		Hooks.on("highlightObjects", highlightObjects);
	}
});
Hooks.on("canvasInit", () => game.aboutFace.combatRunning = game.aboutFace.isCombatRunning());
Hooks.on("canvasReady", async () => {
	canvas.scene.tokens.forEach((tokenDocument) => game.aboutFace.drawAboutFaceIndicator(tokenDocument.object));
});
Hooks.on("combatStart", (combat, updateData) => {
	if (!game.aboutFace.combatOnly) return;
	game.aboutFace.combatRunning = true;
	canvas.tokens?.placeables.forEach((token) => {
		game.aboutFace.drawAboutFaceIndicator(token);
	});
});
Hooks.on("updateCombat", updateCombat);
Hooks.on("deleteCombat", updateCombat);
Hooks.on("preCreateToken", onPreCreateToken);
Hooks.on("preUpdateToken", onPreUpdateToken);
Hooks.on("createToken", (tokenDocument, options, userId) => {
	if (tokenDocument.object) game.aboutFace.drawAboutFaceIndicator(tokenDocument.object);
});
Hooks.on("updateToken", (tokenDocument, changes, options, userId) => {
	if (tokenDocument.object) game.aboutFace.drawAboutFaceIndicator(tokenDocument.object);
});
Hooks.on("refreshToken", (token, options) => {
	if (options.redrawEffects) game.aboutFace.drawAboutFaceIndicator(token);
});
Hooks.on("renderSettingsConfig", renderSettingsConfigHandler);
Hooks.on("renderPrototypeTokenConfig", (_app, form, data, options) => renderTokenConfigHandler(form, data, options, "source"));
Hooks.on("renderTokenConfig", (_app, form, data, options) => renderTokenConfigHandler(form, data, options));
//# sourceMappingURL=about-face.js.map
