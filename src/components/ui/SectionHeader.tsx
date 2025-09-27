export default function SectionHeader(header: any) {
    return (
        <div className="text-center mb-8 md:mb-16">
          <h2 className="mb-4 md:mb-6 text-3xl md:text-5xl font-black uppercase tracking-tight">
            <span className="bg-card text-card-foreground px-3 py-1 md:px-4 md:py-2 border-2 md:border-4 border-foreground shadow-[4px_4px_0px_0px_#000000] md:shadow-[6px_6px_0px_0px_#000000] inline-block -rotate-1 hover:rotate-0 hover:scale-110 transition-all duration-300">
              {header?.header?.Title}
            </span>
            <br />
            {header?.header?.SubTitle && (
                <span className="bg-primary text-primary-foreground px-3 py-1 md:px-4 md:py-2 border-2 md:border-4 border-foreground shadow-[4px_4px_0px_0px_#000000] md:shadow-[6px_6px_0px_0px_#000000] inline-block rotate-1 mt-2 md:mt-4 hover:rotate-0 hover:scale-110 transition-all duration-300">
                {header?.header?.SubTitle}
                </span>
            )}
          </h2>
          {header?.header?.Text && (
            <p className="text-base md:text-xl font-medium max-w-2xl mx-auto bg-card border-2 border-foreground p-4 md:p-6 shadow-[3px_3px_0px_0px_#000000] md:shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] md:hover:shadow-[8px_8px_0px_0px_#000000] hover:-translate-x-[2px] hover:-translate-y-[2px] md:hover:-translate-x-[4px] md:hover:-translate-y-[4px] transition-all duration-300">
              {header?.header?.Text}
            </p>
          )}
        </div>

    );
}