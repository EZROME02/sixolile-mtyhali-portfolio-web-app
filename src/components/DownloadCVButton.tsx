const CV_URL = "/__l5e/assets-v1/a796f034-ece9-4541-a34a-3caa7fbee2c9/Sixolile_Ezrome_Mtyhali_CV.pdf";

export function DownloadCVButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CV_URL}
      download="Sixolile_Ezrome_Mtyhali_CV.pdf"
      className={`inline-flex items-center justify-center rounded-sm border border-cyan/60 bg-cyan/10 px-5 py-3 font-mono text-[10px] tracking-widest text-cyan uppercase transition hover:bg-cyan/20 ${className}`}
      aria-label="Download CV"
    >
      Download CV
    </a>
  );
}
