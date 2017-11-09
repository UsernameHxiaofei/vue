class Head {
	constructor(interfaceName, methodIdent, componentCode, componentVersion, resultCode, information, success, contentLength) {
		this.interfaceName = interfaceName
		this.methodIdent = methodIdent
		this.componentCode = componentCode
		this.componentVersion = componentVersion
		this.resultCode = resultCode
		this.information = information
		this.success = success
		this.contentLength = contentLength
		this.finality = true
	}
}

class Essence {
	constructor(markLiteral, byteBuffer) {
		this.markLiteral = markLiteral
		this.byteBuffer = byteBuffer
	}

	set mark(mark) {
		this.markLiteral = JSON.stringify(mark)
	}

	get mark() {
		return JSON.parse(this.markLiteral || '{}')
	}
}


class Stuff {
	constructor(head, itemLiteral, objectLiteral, auxiliaryLiteral, essences) {
		this.head = head
		this.itemLiteral = itemLiteral
		this.objectLiteral = objectLiteral
		this.auxiliaryLiteral = auxiliaryLiteral
		this.essences = essences
	}

	static instanceRequest(interfaceName, methodIdent, componentCode) {
		let req = new Stuff()
		req.head = { interfaceName: interfaceName, methodIdent: methodIdent, componentCode: componentCode , finality:true }
		return req
	}

	static instanceFault(information) {
		let req = new Stuff()
		req.head = { resultCode: '999999', success: false, information: information }
		return req
	}

	set auxiliary(auxiliary) {
		this.auxiliaryLiteral = JSON.stringify(auxiliary)
	}

	get auxiliary() {
		return JSON.parse(this.auxiliaryLiteral || '{}')
	}


	set object(object) {
		this.objectLiteral = JSON.stringify(object)
	}

	get object() {
		return JSON.parse(this.objectLiteral || '{}')
	}

	set items(items) {
		this.itemLiteral = JSON.stringify(items)
	}

	get items() {
		return JSON.parse(this.itemLiteral || '[]')
	}

}


class Assembler {

	constructor() {
		this.particle = null
		this.reception = []
		this.currentIndex = 0
	}

	read() {
		this.particle = Buffer.concat(this.reception)
		let head = JSON.parse(this.getLiteral())
		let itemLiteral = this.getLiteral()
		let objectLiteral = this.getLiteral()
		let auxiliaryLiteral = this.getLiteral()
		let essences = this.getEssences()
		return new Stuff(head, itemLiteral, objectLiteral, auxiliaryLiteral, essences)
	}

	getLiteral() {
		let literal
		let bb = this.particle.slice(this.currentIndex, this.currentIndex + 4)
		let size = bb.readInt32BE(0)
		let literalBuffer
		if (size != 0) {
			this.currentIndex += 4
			literalBuffer = this.particle.slice(this.currentIndex, this.currentIndex + size)
			literal = literalBuffer.toString()
			this.currentIndex += size
		}
		return literal
	}

	getEssences() {
		let essences = []
		let essence = this.getEssence()
		while (essence) {
			essences.push(essence)
			essence = this.getEssence()
		}
		return essences
	}

	getEssence() {
		let essence
		let literal = this.getLiteral()
		if (literal) {
			let buffer = this.particle.slice(this.currentIndex, this.currentIndex + 4)
			let size = buffer.readInt32BE(0)
			if (size != 0) {
				this.currentIndex += 4
				buffer = this.particle.slice(this.currentIndex, this.currentIndex + size)
				this.currentIndex += size
				essence = new Essence(literal, buffer)
			}
		}
		return essence
	}

	readFragment(data) {
		this.reception.push(data)
	}

	encodeEssence(essence) {
		let essenceBuffer, theBuffer, sizeBuffer
		if (!essence.markLiteral) {
			essence.markLiteral = '{}'
		}
		theBuffer = Buffer.from(essence.markLiteral, 'utf8')
		sizeBuffer = Buffer.alloc(4)
		sizeBuffer.writeInt32BE(theBuffer.length, 0)
		essenceBuffer = Buffer.concat([sizeBuffer, theBuffer])
		theBuffer = essenceBuffer
		if (essence.byteBuffer) {
			sizeBuffer = Buffer.alloc(4)
			sizeBuffer.writeInt32BE(essence.byteBuffer.length, 0)
			essenceBuffer = Buffer.concat([theBuffer, sizeBuffer, essence.byteBuffer])
		}
		return essenceBuffer
	}

	prepareEssences(essences) {
		let essencesBuffer, lastBuffer, sizeBuffer
		if (essences&&essences[0]) {
			essencesBuffer = this.encodeEssence(essences[0])
			for (let i = 1; i < essences.length; i++) {
				lastBuffer = essencesBuffer
				essencesBuffer = Buffer.concat([lastBuffer, this.encodeEssence(essences[i])])
			}
			sizeBuffer = Buffer.alloc(4)
			sizeBuffer.writeInt32BE(0, 0)
			lastBuffer = essencesBuffer
			essencesBuffer = Buffer.concat([lastBuffer, sizeBuffer])
		} else {
			essencesBuffer = Buffer.alloc(4)
			essencesBuffer.writeInt32BE(0, 0)
		}
		return essencesBuffer
	}

	write(stuff, socket) {
		if (!stuff.itemLiteral) {
			stuff.itemLiteral = '[]'
		}
		if (!stuff.objectLiteral) {
			stuff.objectLiteral = '{}'
		}
		if (!stuff.auxiliaryLiteral) {
			stuff.auxiliaryLiteral = '{}'
		}
		const itemLiteralBuffer = Buffer.from(stuff.itemLiteral, 'utf8')
		const objectLiteralBuffer = Buffer.from(stuff.objectLiteral, 'utf8')
		const auxiliaryLiteralBuffer = Buffer.from(stuff.auxiliaryLiteral, 'utf8')
		const essencesBuffer = this.prepareEssences(stuff.essences)
		stuff.head.contentLength = itemLiteralBuffer.length + objectLiteralBuffer.length + essencesBuffer.length + auxiliaryLiteralBuffer.length
		const headLiteral = JSON.stringify(stuff.head)
		const headLiteralBuffer = Buffer.from(headLiteral, 'utf8')
		const sizeBuffer = Buffer.alloc(4)
		sizeBuffer.writeInt32BE(headLiteralBuffer.length, 0)
		socket.write(sizeBuffer)
		socket.write(headLiteralBuffer)
		sizeBuffer.writeInt32BE(itemLiteralBuffer.length, 0)
		socket.write(sizeBuffer)
		socket.write(itemLiteralBuffer)
		sizeBuffer.writeInt32BE(objectLiteralBuffer.length, 0)
		socket.write(sizeBuffer)
		socket.write(objectLiteralBuffer)
		sizeBuffer.writeInt32BE(auxiliaryLiteralBuffer.length, 0)
		socket.write(sizeBuffer)
		socket.write(auxiliaryLiteralBuffer)
		socket.write(essencesBuffer)
	}
}

module.exports = { Assembler, Stuff, Head, Essence }
