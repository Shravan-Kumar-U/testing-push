 interface inputProps {
  placeholder: string;
    onChange?: () => void;
    ref?: any
 }
 
 export function Input({placeholder, onChange, ref}: inputProps){
    return(
        <div className="w-full">
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all"
        onChange={onChange}
      />
    </div>
    )
}