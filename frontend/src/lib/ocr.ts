import Tesseract from "tesseract.js"

export interface OcrProvider {
    getSignatures: (image: Blob) => Promise<Signature[]>;
}

interface Signature {
    name: string;
    address: string;
}

export class TesseractOcr implements OcrProvider {
    private worker?: Tesseract.Worker;

    async initializeWorker() {
        this.worker = await Tesseract.createWorker('eng');
        this.worker.setParameters({
            tessedit_pageseg_mode: Tesseract.PSM.SPARSE_TEXT
        })
    }

    terminateWorker() {
        this.worker?.terminate();
    }

    async getSignatures(image: Blob): Promise<Signature[]> {
        let data = await this.worker?.recognize(image, {}, { blocks: true });

        console.log(data);

        return [];
    }
}