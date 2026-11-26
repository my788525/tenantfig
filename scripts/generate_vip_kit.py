#!/usr/bin/env python3
"""
Generate TenantFig 2026 VIP Statutory Defense Kit deliverables into public/assets/vip/.
Uses python-docx and openpyxl if installed; falls back cleanly to .rtf and .csv.
"""
import os
import csv

OUT_DIR = os.path.join("public", "assets", "vip")
os.makedirs(OUT_DIR, exist_ok=True)


def generate_docx_or_rtf():
    try:
        from docx import Document  # type: ignore

        doc = Document()
        doc.add_heading("TenantFig 2026 Statutory Demand & Rebuttal Suite", 0)
        doc.add_paragraph(
            "Template 1: Security Deposit Statutory Demand Letter (Certified Mail)\n"
            "Jurisdiction: [STATE] ([STATUTE_CITATION])\n"
            "Date: [YYYY-MM-DD]\n\n"
            "Dear [LANDLORD / PROPERTY MANAGER],\n\n"
            "I vacated the premises on [MOVE_OUT_DATE] and delivered my written forwarding address on "
            "[FORWARDING_DATE]. Under [STATUTE_CITATION], you were required to return my $[DEPOSIT] "
            "deposit or provide an itemized statement within [DEADLINE_DAYS] days. Please remit "
            "$[PRINCIPAL] within 5 business days to avoid Small Claims filing for $[TOTAL_CLAIM] "
            "including statutory [MULTIPLIER]x damages."
        )
        doc.add_heading("Template 2: HUD Wear & Tear Depreciation Rebuttal", level=1)
        doc.add_paragraph(
            "Under HUD Handbook 4350.3 and state depreciation standards, carpet has a 5-7 year useful life "
            "and interior paint has a 2-3 year useful life. Normal wear and tear is $0."
        )
        out_path = os.path.join(OUT_DIR, "TenantFig_Demand_Letter_Suite_2026.docx")
        doc.save(out_path)
        print(f"[vip] generated {out_path}")
    except ImportError:
        rtf_content = (
            r"{\rtf1\ansi\deff0"
            r"{\b TenantFig 2026 Statutory Demand & Rebuttal Suite}\par\par"
            r"Template 1: Security Deposit Statutory Demand Letter (Certified Mail)\par"
            r"Jurisdiction: [STATE] ([STATUTE_CITATION])\par"
            r"Remit $[PRINCIPAL] within 5 business days to avoid Small Claims filing for $[TOTAL_CLAIM].\par"
            r"}"
        )
        out_path = os.path.join(OUT_DIR, "TenantFig_Demand_Letter_Suite_2026.rtf")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(rtf_content)
        print(f"[vip] python-docx not installed; generated fallback {out_path}")


def generate_xlsx_or_csv():
    rows = [
        ["Jurisdiction", "Statute", "Deadline_Days", "Multiplier", "Fixed_Penalty_USD", "Small_Claims_Limit_USD"],
        ["California", "Cal. Civ. Code § 1950.5", 21, 2, 0, 12500],
        ["Texas", "Tex. Prop. Code §§ 92.103–92.109", 30, 3, 100, 20000],
        ["New York", "N.Y. Gen. Oblig. Law § 7-108", 14, 2, 0, 10000],
        ["Massachusetts", "Mass. Gen. Laws ch. 186 § 15B", 30, 3, 0, 7000],
        ["Washington", "Wash. Rev. Code § 59.18.280", 30, 2, 0, 10000],
    ]
    try:
        import openpyxl  # type: ignore

        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Statutory_Matrix_2026"
        for r in rows:
            ws.append(r)

        ws2 = wb.create_sheet("Depreciation_Calculator")
        ws2.append(["Asset", "Useful_Life_Months", "Billed_Cost", "Age_Months", "Remaining_Value"])
        ws2.append(["Standard Carpet (5-Yr)", 60, 1650, 72, "=MAX(0,(B2-D2)/B2)*C2"])
        ws2.append(["Interior Paint (3-Yr)", 36, 950, 38, "=MAX(0,(B3-D3)/B3)*C3"])

        out_path = os.path.join(OUT_DIR, "TenantFig_Audit_Workstation_2026.xlsx")
        wb.save(out_path)
        print(f"[vip] generated {out_path}")
    except ImportError:
        out_path = os.path.join(OUT_DIR, "TenantFig_Audit_Workstation_2026.csv")
        with open(out_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerows(rows)
        print(f"[vip] openpyxl not installed; generated fallback {out_path}")


if __name__ == "__main__":
    generate_docx_or_rtf()
    generate_xlsx_or_csv()
