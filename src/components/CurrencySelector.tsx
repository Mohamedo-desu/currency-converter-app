import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { useTheme } from "@/context/ThemeContext";
import { styles } from "@/styles/components/CurrencySelector.styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { FC } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import CustomText from "./CustomText";

interface Currency {
  code: string;
  flag: string;
  name: string;
  symbol?: string;
}

interface CurrencySelectorProps
  extends Pick<
    TextInputProps,
    "value" | "onChangeText" | "editable" | "placeholder"
  > {
  label: string;
  currency: Currency | null;
  onPress: () => void;
}

const CurrencySelector: FC<CurrencySelectorProps> = ({
  editable = true,
  label,
  value,
  onChangeText,
  currency,
  onPress,
  placeholder,
}) => {
  const { colors } = useTheme();
  return (
    <View style={styles.amountContainer}>
      <CustomText
        variant="h6"
        fontWeight="medium"
        style={[styles.label, { color: colors.gray[400] }]}
      >
        {label}
      </CustomText>
      <View style={styles.headerCurrencyContainer}>
        <TouchableOpacity
          onPress={onPress}
          style={styles.headerCurrency}
          activeOpacity={0.8}
        >
          {currency?.flag && (
            <CountryFlag
              isoCode={currency.flag}
              size={Spacing.flagIconSize}
              style={styles.flagIcon}
            />
          )}
          <CustomText
            fontWeight="medium"
            style={{ color: colors.primary }}
            variant="h6"
          >
            {currency?.code || "Select"}
          </CustomText>
          <AntDesign name="down" size={12} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              { color: colors.text, backgroundColor: colors.gray[200] },
            ]}
            placeholder={placeholder}
            placeholderTextColor={colors.gray[300]}
            keyboardType="numeric"
            cursorColor={colors.primary}
            value={value}
            onChangeText={onChangeText}
            editable={editable}
            maxLength={30}
          />
          {editable && value && (
            <TouchableOpacity
              onPress={() => onChangeText?.("")}
              style={styles.clearButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name="close-circle"
                size={Spacing.iconSize}
                color={colors.gray[400]}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <CustomText
        variant="tiny"
        fontWeight="medium"
        style={[
          styles.label,
          { color: colors.gray[400], marginTop: Spacing.margin.sm },
        ]}
      >
        {currency
          ? `${currency.name}${currency.symbol ? ` (${currency.symbol})` : ""}`
          : ""}
      </CustomText>
    </View>
  );
};

export default CurrencySelector;
