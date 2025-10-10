import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  InputAdornment,
  SelectChangeEvent
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

interface CountryCode {
  code: string;
  country: string;
  flag: string;
}

const countryCodes: CountryCode[] = [
  { code: '+7', country: 'Россия', flag: '🇷🇺' },
  { code: '+7', country: 'Казахстан', flag: '🇰🇿' },
  { code: '+375', country: 'Беларусь', flag: '🇧🇾' },
  { code: '+380', country: 'Украина', flag: '🇺🇦' },
  { code: '+374', country: 'Армения', flag: '🇦🇲' },
  { code: '+995', country: 'Грузия', flag: '🇬🇪' },
  { code: '+998', country: 'Узбекистан', flag: '🇺🇿' },
  { code: '+996', country: 'Кыргызстан', flag: '🇰🇬' },
  { code: '+992', country: 'Таджикистан', flag: '🇹🇯' },
  { code: '+993', country: 'Туркменистан', flag: '🇹🇲' },
  { code: '+1', country: 'США', flag: '🇺🇸' },
  { code: '+1', country: 'Канада', flag: '🇨🇦' },
  { code: '+44', country: 'Великобритания', flag: '🇬🇧' },
  { code: '+49', country: 'Германия', flag: '🇩🇪' },
  { code: '+33', country: 'Франция', flag: '🇫🇷' },
  { code: '+39', country: 'Италия', flag: '🇮🇹' },
  { code: '+34', country: 'Испания', flag: '🇪🇸' },
  { code: '+86', country: 'Китай', flag: '🇨🇳' },
  { code: '+81', country: 'Япония', flag: '🇯🇵' },
  { code: '+82', country: 'Южная Корея', flag: '🇰🇷' },
  { code: '+91', country: 'Индия', flag: '🇮🇳' },
  { code: '+55', country: 'Бразилия', flag: '🇧🇷' },
  { code: '+61', country: 'Австралия', flag: '🇦🇺' },
  { code: '+90', country: 'Турция', flag: '🇹🇷' },
  { code: '+966', country: 'Саудовская Аравия', flag: '🇸🇦' },
  { code: '+971', country: 'ОАЭ', flag: '🇦🇪' },
  { code: '+972', country: 'Израиль', flag: '🇮🇱' },
  { code: '+20', country: 'Египет', flag: '🇪🇬' },
  { code: '+27', country: 'ЮАР', flag: '🇿🇦' },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  error,
  helperText,
  disabled,
  placeholder = "900 123 45 67"
}) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Парсим текущее значение для инициализации
  React.useEffect(() => {
    if (value) {
      const foundCountry = countryCodes.find(country => 
        value.startsWith(country.code)
      );
      if (foundCountry) {
        setSelectedCountry(foundCountry);
        setPhoneNumber(value.substring(foundCountry.code.length).trim());
      } else {
        // Если не найден код страны, пробуем извлечь номер
        const match = value.match(/^(\+?\d{1,4})\s*(.*)$/);
        if (match) {
          const code = match[1];
          const number = match[2];
          const country = countryCodes.find(c => c.code === code);
          if (country) {
            setSelectedCountry(country);
            setPhoneNumber(number);
          }
        }
      }
    }
  }, [value]);

  const handleCountryChange = (event: SelectChangeEvent) => {
    const countryCode = event.target.value;
    const country = countryCodes.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      const fullPhone = `${country.code} ${phoneNumber}`.trim();
      onChange(fullPhone);
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = event.target.value;
    setPhoneNumber(number);
    const fullPhone = `${selectedCountry.code} ${number}`.trim();
    onChange(fullPhone);
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
      <FormControl 
        sx={{ minWidth: 120 }} 
        error={error}
        disabled={disabled}
      >
        <InputLabel>Код страны</InputLabel>
        <Select
          value={selectedCountry.code}
          onChange={handleCountryChange}
          label="Код страны"
          renderValue={(value) => {
            const country = countryCodes.find(c => c.code === value);
            return country ? `${country.flag} ${country.code}` : value;
          }}
        >
          {countryCodes.map((country) => (
            <MenuItem key={`${country.code}-${country.country}`} value={country.code}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>{country.flag}</span>
                <span>{country.code}</span>
                <span style={{ color: '#666', fontSize: '0.9em' }}>
                  {country.country}
                </span>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <TextField
        label="Номер телефона"
        value={phoneNumber}
        onChange={handlePhoneChange}
        error={error}
        helperText={helperText}
        disabled={disabled}
        placeholder={placeholder}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon />
            </InputAdornment>
          ),
        }}
        inputProps={{
          maxLength: 15,
        }}
      />
    </Box>
  );
};

export default PhoneInput;
