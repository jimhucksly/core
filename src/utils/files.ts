class Files {
  getExtension(filename: string): string {
    if (!filename) {
      return '';
    }
    // eslint-disable-next-line no-bitwise
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
  }
  getFileName(filename: string): string {
    if (!filename) {
      return '';
    }
    const extension = this.getExtension(filename);
    return filename.slice(0, -extension.length - 1);
  }
  formatSize(bytes: number | string, decimals: number = 2): string {
    if (!bytes) {
      return '0 Bytes';
    }
    if (typeof bytes === 'string') {
      bytes = Number(bytes);
    }
    if (Number.isNaN(bytes) || bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
  }
}

const files = new Files();
export { files };
