type LanguageProps = {
  primaryLanguage: {
    color: string;
    name: string;
  };
};

function Language({ primaryLanguage }: LanguageProps) {
  return (
    <div className="flex items-center gap-1">
      <div
        className="sm:w-2 sm:h-2 h-[6px] w-[6px] rounded-full"
        style={{ backgroundColor: primaryLanguage.color }}
      />
      <p className="sm:text-sm text-xs text-stone-400">
        {primaryLanguage.name}
      </p>
    </div>
  );
}

export default Language;
